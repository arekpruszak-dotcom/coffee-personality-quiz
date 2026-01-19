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
    const sheetDbUrl = process.env.SHEETDB_API_URL?.trim();

    if (sheetDbUrl) {
      console.log('Attempting to save to SheetDB...');
      console.log('URL length:', sheetDbUrl.length);

      const payload = {
        data: {
          email,
          personality,
          timestamp,
          source: 'quiz-web'
        }
      };

      console.log('Payload:', JSON.stringify(payload));

      const response = await fetch(sheetDbUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('SheetDB response status:', response.status);
      console.log('SheetDB response:', responseText);

      if (!response.ok) {
        return NextResponse.json(
          { error: `SheetDB error: ${response.status} - ${responseText}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Osobowość zapisana w profilu!',
        sheetDbResponse: responseText
      });
    } else {
      // Tryb demo - loguj do konsoli
      console.log('📝 Nowy wynik quizu (demo):', { email, personality, timestamp });
      console.log('⚠️ SHEETDB_API_URL nie jest ustawiony');

      return NextResponse.json({
        success: true,
        message: 'Zapisano (tryb demo)',
        demo: true
      });
    }

  } catch (error) {
    console.error('Błąd zapisu:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Wystąpił błąd: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasSheetDb = !!process.env.SHEETDB_API_URL;
  const urlLength = process.env.SHEETDB_API_URL?.trim().length || 0;
  return NextResponse.json({
    message: 'API działa. Użyj POST aby zapisać osobowość.',
    sheetDbConfigured: hasSheetDb,
    urlLength: urlLength,
    version: '1.2'
  });
}
