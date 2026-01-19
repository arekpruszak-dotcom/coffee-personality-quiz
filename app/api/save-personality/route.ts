import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, personality, timestamp } = await request.json();

    // Walidacja
    if (!email || !personality) {
      return NextResponse.json(
        { error: 'Email i osobowość są wymagane' },
        { status: 400 }
      );
    }

    // Pobierz URL z zmiennej środowiskowej w runtime
    const sheetDbUrl = process.env.SHEETDB_API_URL;

    if (sheetDbUrl) {
      const response = await fetch(sheetDbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            email,
            personality,
            timestamp,
            source: 'quiz-web'
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('SheetDB error:', errorText);
        throw new Error('Błąd zapisu do SheetDB');
      }
    } else {
      // Tryb demo - loguj do konsoli
      console.log('📝 Nowy wynik quizu (demo):', { email, personality, timestamp });
      console.log('⚠️ SHEETDB_API_URL nie jest ustawiony');
    }

    return NextResponse.json({
      success: true,
      message: 'Osobowość zapisana w profilu!'
    });

  } catch (error) {
    console.error('Błąd zapisu:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasSheetDb = !!process.env.SHEETDB_API_URL;
  return NextResponse.json({
    message: 'API działa. Użyj POST aby zapisać osobowość.',
    sheetDbConfigured: hasSheetDb,
    version: '1.1'
  });
}
