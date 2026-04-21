           (function() {
            // ===== FUNÇÃO PARA ALTERNAR TEMA (PRETO / BRANCO) =====
            const botaoPreto = document.getElementById('botao-preto');
            const botaoBranco = document.getElementById('botao-branco');
            const corpo = document.body;

            function definirTema(tema) {
                if (tema === 'escuro') {
                    corpo.classList.remove('tema-claro');
                    corpo.classList.add('tema-escuro');
                    localStorage.setItem('temaPortfolio', 'escuro');
                } else if (tema === 'claro') {
                    corpo.classList.remove('tema-escuro');
                    corpo.classList.add('tema-claro');
                    localStorage.setItem('temaPortfolio', 'claro');
                }
            }

            if (botaoPreto) botaoPreto.addEventListener('click', () => definirTema('escuro'));
            if (botaoBranco) botaoBranco.addEventListener('click', () => definirTema('claro'));

            // Carregar tema salvo anteriormente
            const temaSalvo = localStorage.getItem('temaPortfolio');
            if (temaSalvo === 'claro') definirTema('claro');
            else if (temaSalvo === 'escuro') definirTema('escuro');
            else definirTema('escuro'); // tema padrão preto

            // ===== VÍDEO INTERATIVO: REPRODUZIR SOMENTE AO CLICAR NO VÍDEO =====
            const containersVideo = document.querySelectorAll('.container-video-projeto');
            
            containersVideo.forEach(container => {
                const videoElemento = container.querySelector('video');
                if (!videoElemento) return;
                
                // Configuração inicial: vídeo pausado e sem overlay de tocando
                videoElemento.pause();
                videoElemento.currentTime = 0;
                container.classList.remove('video-tocando');
                
                // Função para reproduzir o vídeo
                function reproduzirVideo() {
                    // Se o vídeo já estiver tocando, pausa e reseta
                    if (!videoElemento.paused) {
                        videoElemento.pause();
                        videoElemento.currentTime = 0;
                        container.classList.remove('video-tocando');
                    } else {
                        // Tenta reproduzir o vídeo
                        videoElemento.play().catch(erro => {
                            console.log("Erro ao reproduzir: ", erro);
                            // Se falhar, garante que o mute está ativo e tenta novamente
                            videoElemento.muted = true;
                            videoElemento.play().catch(err => console.warn("Não foi possível reproduzir o vídeo:", err));
                        });
                        container.classList.add('video-tocando');
                    }
                }
                
                // Adicionar evento de clique no container inteiro
                container.addEventListener('click', (evento) => {
                    evento.stopPropagation();
                    reproduzirVideo();
                });
                
                // Quando o vídeo terminar, reseta e esconde o overlay
                videoElemento.addEventListener('ended', () => {
                    container.classList.remove('video-tocando');
                    videoElemento.currentTime = 0;
                });
                
                // Carrega o vídeo
                videoElemento.load();
            });
            
            // ===== FORMULÁRIO DE CONTATO - ENVIA MENSAGEM PARA renatomalebo73@gmail.com =====
            const formulario = document.getElementById('formulario-contato');
            const statusMsg = document.getElementById('status-formulario');
            
            if (formulario) {
                formulario.addEventListener('submit', function(evento) {
                    evento.preventDefault();
                    
                    // Pegar valores dos campos
                    const nome = document.getElementById('nome-contato').value.trim();
                    const email = document.getElementById('email-contato').value.trim();
                    const assunto = document.getElementById('assunto-contato').value.trim() || "Mensagem do portfólio";
                    const mensagem = document.getElementById('mensagem-contato').value.trim();
                    
                    // Validação simples
                    if (!nome || !email || !mensagem) {
                        statusMsg.innerHTML = '<span style="color:#ef4444;">❌ Por favor, preencha nome, e-mail e mensagem.</span>';
                        return;
                    }
                    
                    if (!email.includes('@') || !email.includes('.')) {
                        statusMsg.innerHTML = '<span style="color:#ef4444;">❌ Digite um e-mail válido.</span>';
                        return;
                    }
                    
                    // Mostrar mensagem de carregamento
                    statusMsg.innerHTML = '<span style="color:#3b82f6;">📤 Preparando mensagem...</span>';
                    
                    // Criar link mailto para abrir o cliente de e-mail do usuário
                    const assuntoCodificado = encodeURIComponent(`[Portfólio] ${assunto} - de ${nome}`);
                    const corpoMensagem = encodeURIComponent(
                        `Nome: ${nome}\n` +
                        `E-mail: ${email}\n\n` +
                        `Mensagem:\n${mensagem}\n\n` +
                        `---\nEnviado através do portfólio profissional.`
                    );
                    
                    const linkMailTo = `mailto:renatomalebo73@gmail.com?subject=${assuntoCodificado}&body=${corpoMensagem}`;
                    
                    // Abrir o cliente de e-mail padrão do usuário
                    window.location.href = linkMailTo;
                    
                    // Atualizar status
                    statusMsg.innerHTML = '<span style="color:#10b981;">✅ Seu cliente de e-mail foi aberto! Envie a mensagem para concluir.</span>';
                    
                    // Limpar mensagem de status após alguns segundos
                    setTimeout(() => {
                        statusMsg.innerHTML = '';
                    }, 6000);
                });
            }
            
            // ===== NAVEGAÇÃO SUAVE AO CLICAR NOS LINKS DO MENU =====
            const linksNavegacao = document.querySelectorAll('.menu-links a, .botao-principal[href="#projetos"], .botao-secundario[href="#contato"]');
            linksNavegacao.forEach(link => {
                link.addEventListener('click', function(evento) {
                    const destinoId = this.getAttribute('href');
                    if (destinoId && destinoId.startsWith('#')) {
                        evento.preventDefault();
                        const elementoDestino = document.querySelector(destinoId);
                        if (elementoDestino) {
                            elementoDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });
        })();