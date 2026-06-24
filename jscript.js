// -- ATTENZIONE PROPRIETA' PRIVATA DI SFRISO PAOLO --

        const FioriDisponibili = ["media/fi_0.gif", "media/fi_1.gif", "media/fi_2.gif", "media/fi_3.gif", "media/fi_4.gif", "media/fi_5.gif", "media/fi_6.gif", "media/fi_7.gif", "media/fi_8.gif", "media/fi_9.gif", "media/fi_10.gif", "media/fi_11.gif"];
        const GattoImg = "media/ga_0.gif";

        // MODIFICA: Alzato a 65 per un effetto prato ricchissimo e super fiorito!
        const TOTALE_FIORI = 65;

        function Start() {
            // 1. Creiamo il gatto al centro dello schermo
            let gatto = document.createElement("img");
            gatto.src = GattoImg;
            gatto.id = "gatto-fisso";
            document.body.appendChild(gatto);

            // 2. Distribuzione scaglionata all'avvio dei fiori
            for (let i = 0; i < TOTALE_FIORI; i++) {
                // Li distribuiamo lungo lo schermo e anche oltre a destra, per un flusso continuo
                let xIniziale = Math.random() * (window.innerWidth + 1000);
                creaFioreContinuo(xIniziale);
            }

            // 3. l'orologio parte in tempo reale
            aggiornaDataOra();
            setInterval(aggiornaDataOra, 1000);
        }

        function aggiornaDataOra() {
            const adesso = new Date();
            const opzioniData = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            let dataFormattata = adesso.toLocaleDateString('it-IT', opzioniData);
            dataFormattata = dataFormattata.charAt(0).toUpperCase() + dataFormattata.slice(1);

            const ore = String(adesso.getHours()).padStart(2, '0');
            const minuti = String(adesso.getMinutes()).padStart(2, '0');
            const secondi = String(adesso.getSeconds()).padStart(2, '0');
            const oraFormattata = "Ora: " + ore + ":" + minuti + ":" + secondi;

            document.getElementById('data-ora').innerHTML = dataFormattata + "<br>" + oraFormattata;
        }

        function creaFioreContinuo(posizioneXIniziale) {
            let f = document.createElement("img");

            function resettaFiore(elemento) {
                let indice = Math.floor(Math.random() * FioriDisponibili.length);
                elemento.src = FioriDisponibili[indice];
                elemento.className = "fiore";

                // TRUCCO TRIDIMENSIONALE: Ogni fiore si posiziona a un'altezza leggermente diversa sull'erba (tra 10px e 35px dal fondo)
                let altezzaCasuale = 10 + Math.floor(Math.random() * 25);
                elemento.style.bottom = altezzaCasuale + "px";

                // Mettiamo i fiori più in basso davanti a quelli più in alto (ordine visivo naturale)
                elemento.style.zIndex = 100 - altezzaCasuale;
            }

            resettaFiore(f);
            document.body.appendChild(f);

            let posX = posizioneXIniziale;
            // Velocità leggermente diverse per non farli muovere a blocchi rigidi
            let velocita = 0.6 + Math.random() * 1.2;

            function muoviti() {
                posX -= velocita;
                f.style.left = posX + "px";

                if (posX > -100) {
                    requestAnimationFrame(muoviti);
                } else {
                    // Quando esce, rinasce in una coda flessibile a destra fuori schermo
                    posX = window.innerWidth + Math.random() * 100;
                    velocita = 0.6 + Math.random() * 1.2;
                    resettaFiore(f);
                    requestAnimationFrame(muoviti);
                }
            }
            requestAnimationFrame(muoviti);
        }