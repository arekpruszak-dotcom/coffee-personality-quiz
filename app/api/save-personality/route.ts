import { NextResponse } from 'next/server';

// Tymczasowe rozwiązanie - zapisuje do Google Sheets przez SheetDB
// Później można zamienić na bezpośrednie API Google Sheets lub własną bazę danych

const SHEETDB_API_URL = process.env.SHEETDB_API_URL;

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

    // Jeśli skonfigurowano SheetDB, zapisz tam
    if (SHEETDB_API_URL) {
      const response = await fetch(SHEETDB_API_URL, {
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
        throw new Error('Błąd zapisu do SheetDB');
      }
    } else {
      // Tryb demo - loguj do konsoli
      console.log('📝 Nowy wynik quizu:', { email, personality, timestamp });
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

// GET - pobierz statystyki (opcjonalne)
export async function GET() {
  return NextResponse.json({
    message: 'API działa. Użyj POST aby zapisać osobowość.',
    version: '1.0'
  });
}
