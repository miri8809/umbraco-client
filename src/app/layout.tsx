export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html >
            <body >
                <div className="App" id="root">
                    <main id="main-content">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}


