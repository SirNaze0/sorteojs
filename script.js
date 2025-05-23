 // Datos de los equipos
        const teams = [
            {base: '22', team_name: 'Infieles F.C.', captain: 'Christian Torres'},
            {base: '24', team_name: 'Manchester FISI', captain: ' Christopher Saccaco'},
            {base: '23', team_name: 'Sporting Mostaza FC', captain: 'Paolo Quispe'},
            {base: '24', team_name: 'La Vecindad FC', captain: 'Angel Salazar'},
            {base: '21', team_name: 'FC BARCELONA', captain: 'Gorka Contreras'},
            {base: '23', team_name: 'FisiBayern B23', captain: 'Jose Ñahuis'},
            {base: '20', team_name: 'Toque Fino', captain: 'Diego Chavez'},
            {base: '22', team_name: 'Sport Mottazoide', captain: 'Angel Dioses'},
            {base: '20', team_name: 'León XIV F. C', captain: 'Sandro Guevara'},
            {base: '23', team_name: 'Los Migajeros', captain: 'Francess Vasquez'},
            {base: '25', team_name: 'Fisichulones fc', captain: 'Fabrizio Cerna'},
            {base: '25', team_name: 'Creeper FC', captain: 'Fabio Marin'},
            {base: '25', team_name: 'Los Galácticos de la FISI', captain: 'Sebastian Cisneros'},
            {base: '25', team_name: 'DarkGWolves', captain: 'Rafael Marina'},
            {base: '23', team_name: 'F++', captain: 'Anderson Tataje'},
            {base: '22', team_name: 'Los operadores', captain: 'Jack Zavaleta'}
        ];

        // Estado del bracket
        let bracketPositions = Array(16).fill(null);
        let allSorted = false;

        // Elementos DOM
        const btnSortear = document.getElementById('btn-sortear');
        const btnReiniciar = document.getElementById('btn-reiniciar');
        const teamsLeft = document.getElementById('teams-left');
        const teamsRight = document.getElementById('teams-right');
        const octavosIzq = document.getElementById('octavos-izq');
        const octavosDer = document.getElementById('octavos-der');

        // Inicializar la aplicación
        function init() {
            renderTeams();
            renderBracket();
            
            btnSortear.addEventListener('click', sortearEquipo);
            btnReiniciar.addEventListener('click', reiniciar);
        }

        // Renderizar equipos
        function renderTeams() {
            // Primeros 8 equipos a la izquierda
            teamsLeft.innerHTML = '';
            for (let i = 0; i < 8; i++) {
                const team = teams[i];
                const teamCard = document.createElement('div');
                teamCard.className = 'team-card';

                let teamNameHtml;
                if (team.team_name === 'Manchester FISI') {
                    teamNameHtml = `<strong style="font-size: 0.8em;">${team.team_name}</strong>`;
                    teamCard.innerHTML = `
                        ${teamNameHtml}
                        <small style="font-size: 0.68em;">Capitán: ${team.captain}</small>
                    `;
                } else {
                    teamNameHtml = `<strong>${team.team_name}</strong>`;
                    teamCard.innerHTML = `
                        ${teamNameHtml}
                        <small>Capitán: ${team.captain}</small>
                    `;
                }

                teamsLeft.appendChild(teamCard);
            }

            // Últimos 8 equipos a la derecha
            teamsRight.innerHTML = '';
            for (let i = 8; i < teams.length; i++) {
                const team = teams[i];
                const teamCard = document.createElement('div');
                teamCard.className = 'team-card';

                let teamNameHtml;
                if (team.team_name === 'Los Galácticos de la FISI') {
                    teamNameHtml = `<strong style="font-size: 0.79em;">${team.team_name}</strong>`;
                    teamCard.innerHTML = `
                    ${teamNameHtml}
                    <small style="font-size: 0.7em;">Capitán: ${team.captain}</small>
                    `;
                } else {
                    teamNameHtml = `<strong>${team.team_name}</strong>`;
                    teamCard.innerHTML = `
                    ${teamNameHtml}
                    <small>Capitán: ${team.captain}</small>
                `;
                }
                teamsRight.appendChild(teamCard);
            }
        }

        // Crear tarjeta de equipo para el bracket
        function createTeamBracketCard(team) {
            const card = document.createElement('div');
            card.className = 'team-bracket-card';
            
            if (team) {
                card.classList.add('team-filled');
                card.innerHTML = `
                    <div class="team-name">${team.team_name}</div>
                    <div class="team-info">B${team.base} - ${team.captain}</div>
                `;
            } else {
                card.classList.add('team-empty');
                card.innerHTML = '<strong>Por definir</strong>';
            }
            
            return card;
        }

        // Renderizar bracket
        function renderBracket() {
            // Limpiar contenedores
            octavosIzq.innerHTML = '';
            octavosDer.innerHTML = '';

            // 8vos Izquierda (partidos 1-4)
            for (let i = 0; i < 8; i += 2) {
                const matchContainer = document.createElement('div');
                matchContainer.className = 'match-container';
                
                const matchTitle = document.createElement('div');
                matchTitle.className = 'match-title';
                matchTitle.textContent = `Partido ${(i/2) + 1}`;
                
                const team1Card = createTeamBracketCard(bracketPositions[i]);
                const team2Card = createTeamBracketCard(bracketPositions[i + 1]);
                
                matchContainer.appendChild(matchTitle);
                matchContainer.appendChild(team1Card);
                matchContainer.appendChild(team2Card);
                octavosIzq.appendChild(matchContainer);
            }

            // 8vos Derecha (partidos 5-8)
            for (let i = 8; i < 16; i += 2) {
                const matchContainer = document.createElement('div');
                matchContainer.className = 'match-container';
                
                const matchTitle = document.createElement('div');
                matchTitle.className = 'match-title';
                matchTitle.textContent = `Partido ${(i/2) + 1}`;
                
                const team1Card = createTeamBracketCard(bracketPositions[i]);
                const team2Card = createTeamBracketCard(bracketPositions[i + 1]);
                
                matchContainer.appendChild(matchTitle);
                matchContainer.appendChild(team1Card);
                matchContainer.appendChild(team2Card);
                octavosDer.appendChild(matchContainer);
            }
        }

        // Sortear próximo equipo
        function sortearEquipo() {
            // Obtener equipos ya sorteados
            const sortedTeams = bracketPositions.filter(pos => pos !== null);
            const sortedNames = sortedTeams.map(team => team.team_name);
            
            // Obtener equipos disponibles
            const availableTeams = teams.filter(team => !sortedNames.includes(team.team_name));
            
            if (availableTeams.length === 0) return;
            
            // Encontrar primera posición vacía y asignar equipo aleatorio
            for (let i = 0; i < bracketPositions.length; i++) {
                if (bracketPositions[i] === null) {
                    const randomIndex = Math.floor(Math.random() * availableTeams.length);
                    bracketPositions[i] = availableTeams[randomIndex];
                    break;
                }
            }
            
            // Verificar si todos los equipos han sido sorteados
            if (bracketPositions.every(pos => pos !== null)) {
                allSorted = true;
                btnSortear.disabled = true;
            }
            
            renderBracket();
        }

        // Reiniciar sorteo
        function reiniciar() {
            bracketPositions = Array(16).fill(null);
            allSorted = false;
            btnSortear.disabled = false;
            renderBracket();
        }

        // Inicializar cuando se carga la página
        document.addEventListener('DOMContentLoaded', init);