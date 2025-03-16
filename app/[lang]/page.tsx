import Header from "../components/header"
import MainPage from "../components/main"
import { getDictionary } from "../dictionaries"

export default async function RootLayout({
    params
}: Readonly<{ params: Promise<{ lang: 'en' | 'es' | 'fr' }> }>) {
    const { lang } = await params
    const dict = await getDictionary(lang) // en
    return <>
        <Header dict={dict} />
        <main className="pt-24">
            <MainPage dict={dict} />
        </main>
    </>
}
