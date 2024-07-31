# Documento referente ao Backlog

## 1. Introdução
O Echoeasy, um aplicativo mobile, é uma biblioteca autoral de resumo de diretrizes médicas e artigos cientificos relevantes na área de ecocardiografia (manuais de condutas ou rotinas), de rápida consulta e atualizados constantemente, com fluxos de algoritmos que facilitam o diagnóstico.

Este documento detalha o backlog do projeto Echoeasy, incluindo os requisitos funcionais e não funcionais, as user stories e o backlog de desenvolvimento. O objetivo é fornecer uma visão clara e estruturada das funcionalidades e características que o aplicativo deve possuir, bem como as prioridades e a sequência de desenvolvimento.

## 2. Requisitos Funcionais (RF)
Requisitos funcionais descrevem as funcionalidades e as ações que um sistema ou produto deve ser capaz de executar. Eles detalham as tarefas específicas que este produto deve realizar para atender às necessidades do usuário.

<center>

**Tabela 01** - Requisitos Funcionais

|  N°  |                                           Descrição                                            |
|:----:|:----------------------------------------------------------------------------------------------:|
| RF01 |               O sistema deverá segmentar o conteúdo mostrado por tipo de usuário                |
| RF02 |                    O sistema deverá conter um tipo de usuário administrador                     |
| RF03 |                        O sistema deverá conter um tipo de usuário médico                        |
| RF04 |                        O sistema deverá ser capaz de enviar notificações                        |
| RF05 |                      O sistema deverá verificar o pagamento da assinatura                      |
| RF06 | O sistema deverá restringir o acesso do usuário médico condicionado ao pagamento da assinatura |
| RF07 |                         O sistema deverá ser capaz de gerar relatórios                          |
| RF08 |                 O usuário administrador deverá ser capaz de gerenciar usuários                  |
| RF09 |               O usuário administrador deverá ser capaz de gerenciar os material                |
| RF10 |                O usuário administrador deverá ser capaz de visualizar relatórios                |
| RF11 |           Os usuários (médico e administrador) deverão ser capazes de realizar login            |
| RF12 |          Os usuários (médico e administrador) deverão ser capazes de recuperar a senha          |
| RF13 | Os usuários (médico e administrador) deverão ser capazes de editar suas informações cadastradas |
| RF14 |   Os usuários (médico e administrador) deverão ser capazes de realizar busca em vários níveis   |
| RF15 |                  O usuário médico deverá ser capaz de se cadastrar no sistema                   |
| RF16 |                  O usuário médico deverá ser capaz de visualizar os conteúdos                   |
| RF17 |                    O usuário médico deverá ser capaz de favoritar conteúdos                     |
| RF18 |      O usuário médico deverá ser capaz de utilizar algoritmos para auxílio no diagnóstico       |
| RF19 |                    O usuário médico deverá ser capaz de receber notificações                    |
| RF20 |                  O usuário médico deverá ser capaz de visualizar notificações                   |

</center>

## 3. Requisitos não Funcionais (RnF)
Requisitos não funcionais descrevem características e qualidades do sistema ou produto. Eles estão relacionados a aspectos do URPS+ [5](./referencias) como usabilidade, confiabilidade, desempenho, suportabilidade, restrições de design, requisitos de implementação, requisitos de interface e requisitos físicos.

<center>


**Tabela 02** - Requisitos Não Funcionais

| N°    | Tipo            | Descrição                                                                                                                     |
|:----- |:--------------- |:----------------------------------------------------------------------------------------------------------------------------- |
| RnF01 | Design          | Deve garantir que a aplicação mantenha um estilo de design consistente em toda a interface, incluindo fontes, cores e ícones. |
| RnF02 | Suportabilidade | Deve garantir que a aplicação seja compatível com diferentes tipos de smartphones e tablets                                   |
| RnF03 | Interface       | Deve garantir que haja responsividade, permitindo adaptação da tela em diferentes tipos de smartphones e tablets              |
| RnF04 | Confiabilidade  | Deve garantir que apenas usuários registrados no sistema tenham acesso a aplicação.                                           |
| RnF05 | Implementação   | Deve garantir que haja regras para lidar com que os dados sensíveis inseridos no banco de dados estejam corretos e válidos.   |
| RnF06 | Implementação   | Deve garantir que as rotas  estejam autenticadas                                                                              |
| RnF07 | Desempenho      | Deve garantir que as requisições do servidor não demorem mais que 1 segundo para serem carregados                             |

</center>

## 4. User Storys (USs)
As user stories são descrições simples e concisas das funcionalidades desejadas do ponto de vista do usuário final. Elas servem como base para a compreensão dos requisitos e expectativas dos usuários em relação ao sistema e segue a estrutura " Como 'cargo', eu gostaria de 'objetivo' para que 'finalidade ". 
<center>

**Tabela 03** - User storys

|  N°  |                                                                     Descrição                                                                      |
|:----:|:--------------------------------------------------------------------------------------------------------------------------------------------------:|
| US01 |                                 Como médico, eu gostaria de me registrar no sistema para ter credenciais de acesso                                 |
| US02 |                          Como médico, eu gostaria de realizar login no sistema para ter acesso ao conteúdo da plataforma                           |
| US03 |                     Como administrador, eu gostaria de realizar login no sistema para ter acesso às funcionalidades de gestão                      |
| US04 |               Como usuário (médico ou administrador), eu gostaria de redefinir a minha senha para recuperar as credenciais de acesso               |
| US05 |                Como usuário (médico ou administrador), eu gostaria de editar o meu perfil para atualizar as informações cadastradas                |
| US06 |                                   Como médico, eu gostaria de acessar área de finanças para gerenciar assinatura                                   |
| US07 |                            Como administrador, eu gostaria de criar outras contas administrador para auxiliar na gestão                            |
| US08 |                             Como administrador, eu gostaria de listar usuários para visualizar os usuários cadastrados                             |
| US09 |                           Como administrador, eu gostaria de editar um usuário para corrigir eventuais erros de cadastro                           |
| US10 |                          Como administrador, eu gostaria de excluir um usuário para retirar eventuais cadastros indevidos                          |
| US11 |                      Como administrador, eu gostaria de pesquisar um usuário específico para encontrá-lo com mais facilidade                       |
| US12 |                                 Como administrador, eu gostaria de criar um documento para adicionar novo material                                 |
| US13 |                             Como administrador, eu gostaria de listar documentos para visualizar materiais cadastrados                             |
| US14 |                                 Como administrador, eu gostaria de editar um documento para atualizar um material                                  |
| US15 |                               Como administrador, eu gostaria de excluir um documento para remover material defasado                               |
| US16 |                          Como administrador, eu gostaria de criar um assunto para complementar um documento já cadastrado                          |
| US17 |                     Como administrador, eu gostaria de listar assuntos para visualizar os assuntos cadastrados em um documento                     |
| US18 |                                   Como administrador, eu gostaria de editar um assunto para atualizar o material                                   |
| US19 |                                Como administrador, eu gostaria de excluir um assunto para remover material defasado                                |
| US20 |                      Como administrador, eu gostaria de pesquisar um material específico para encontrá-lo com mais facilidade                      |
| US21 | Como administrador, eu gostaria de visualizar relatórios sobre os usuários médicos cadastrados para ter insights que auxiliem na tomada de decisão |
| US22 |          Como administrador, eu gostaria de visualizar relatórios sobre os conteúdos para ter insights que auxiliem na tomada de decisão           |
| US23 |                                    Como médico, eu gostaria de acessar um documento para visualizar o material                                     |
| US24 |                    Como médico, eu gostaria de pesquisar um material para encontrar com mais facilidade um documento específico                    |
| US25 |                       Como médico, eu gostaria de favoritar um material para encontrá-lo com mais facilidade posteriormente                        |
| US26 |                                 Como médico, eu gostaria de acessar os algoritmos para me auxiliar no diagnóstico                                  |
| US27 |                 Como médico, eu gostaria de acessar notificações para que eu possa estar sempre informado sobre novas atualizações                 |

</center>


## 5. Backlog
O backlog do projeto é uma lista abrangente de todas as tarefas, funcionalidades e melhorias planejadas para o aplicativo. Ele serve como uma referência central para o que precisa ser desenvolvido, permitindo que a equipe de desenvolvimento tenha uma visão clara do escopo do projeto e serve como uma lista de funcionalidades que serão priorizadas e selecionadas para o escopo do [MVP](./mvp.md) .
<center>

**Tabela 04** - Backlog

| Épico              | Capacidade                  | Feature                                  | User Story | Objetivo                                                                                |
| ------------------ | --------------------------- | :--------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| EP-01 - Acesso     | CA01 - Acesso               | FE01 - Cadastrar médico                  | US01       | Permitir o registro de médicos no sistema.                                              |
| EP-01 - Acesso     | CA01 - Acesso               | FE02 - Fazer login                       | US02, US03 | Permitir que médicos e administradores façam login.                                     |
| EP-01 - Acesso     | CA01 - Acesso               | FE03 - Recuperar Senha                   | US04       | Permitir que os usuários redefinam suas senhas.                                         |
| EP-02 - Meu perfil | CA02 - Dados do usuário     | FE04 - Editar Perfil                     | US05       | Permitir que os usuários editem suas informações cadastradas.                           |
| EP-02 - Meu perfil | CA02 - Dados do usuário     | FE05 - Pagamento                         | US06       | Permitir que os usuários editem as informações de pagamento cadastradas.                |
| EP-02 - Meu perfil | CA03 - Atualizações         | FE05 - Notificações                      | US27       | Manter os usuários informados sobre atualizações e novidades.                           |
| EP-03 - Usuários   | CA04 - Administração        | FE06 - Criar Admin                       | US07       | Permitir a criação de contas de administradores.                                        |
| EP-03 - Usuários   | CA04 - Administração        | FE07 - Listar Usuários                   | US08       | Permitir que administradores listem usuários do sistema.                                |
| EP-03 - Usuários   | CA04 - Administração        | FE08 - Editar Usuário                    | US09       | Permitir que administradores editem usuários.                                           |
| EP-03 - Usuários   | CA04 - Administração        | FE09 - Excluir Usuário                   | US10       | Permitir que administradores excluam usuários.                                          |
| EP-03 - Usuários   | CA04 - Administração        | FE10 - Pesquisar Usuário                 | US11       | Permitir que administradores pesquisem usuários.                                        |
| EP-04 - Material   | CA04 - Administração        | FE11 - Criar Documento                   | US12       | Permitir a criação de documentos de conteúdo.                                           |
| EP-04 - Material   | CA04 - Administração        | FE12 - Listar Documentos                 | US13       | Permitir que administradores listem documentos.                                         |
| EP-04 - Material   | CA04 - Administração        | FE13 - Editar Documento                  | US14       | Permitir que administradores editem documentos.                                         |
| EP-04 - Material   | CA04 - Administração        | FE14 - Excluir Documento                 | US15       | Permitir que administradores excluam documentos.                                        |
| EP-04 - Material   | CA04 - Administração        | FE15 - Criar Assunto                     | US16       | Permitir a criação de assuntos complementares aos documentos.                           |
| EP-04 - Material   | CA04 - Administração        | FE16 - Listar Assuntos                   | US17       | Permitir que administradores listem assuntos de documentos.                             |
| EP-04 - Material   | CA04 - Administração        | FE17 - Editar Assunto                    | US18       | Permitir que administradores editem assuntos.                                           |
| EP-04 - Material   | CA04 - Administração        | FE18 - Excluir Assunto                   | US19       | Permitir que administradores excluam assuntos.                                          |
| EP-04 - Material   | CA04 - Administração        | FE19 - Pesquisar Material                | US20       | Permitir que administradores pesquisem materiais específicos.                           |
| EP-05 - Relatórios | CA05 -  Análise de Dados    | FE20 - Visualizar relatórios de usuários | US21       | Permitir que administradores visualizem gráficos relacionados aos usuários cadastrados  |
| EP-05 - Relatórios | CA05 - Análise de Dados     | FE21 - Visualizar relatórios de usuários | US22       | Permitir que administradores visualizem gráficos relacionados aos materiais cadastrados |
| EP-06 - Visualizar | CA06 - Acesso aos Materiais | FE22 - Visualizar Documentos             | US23       | Permitir ao médico acessar o documento por completo                                     |
| EP-06 - Visualizar | CA06 - Acesso aos Materiais | FE23 - Pesquisar Material                | US24       | Facilitar o acesso de materiais específicos.                                            |
| EP-06 - Visualizar | CA06 - Acesso aos Materiais | FE24 - Favoritar Material                | US25       | Permitir que médicos favoritem materiais para acesso rápido.                            |
| EP-07 - Algoritmos | CA07 - Consulta Médica      | FE25 - Algoritmos de Diagnóstico         | US26       | Permitir que médicos usem algoritmos para auxílio no diagnóstico.                       |

</center>

## 5. Histórico de Versão 
| Data       | Versão | Descrição                                              | Autor(es)                                                                                                                                                                                     |
| :--------- | :----: | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 19/07/2024 | `0.1`  | Criação e Estruturação do documento                    | [Leandro Almeida](https://github.com/leanars)                                                                                                                                                 |
| 31/07/2024 | `0.2`  | Refatoração dos requisitos funcionais e não funcionais | [Alexandre Beck](https://github.com/zzzBECK), [Leandro Almeida](https://github.com/leanars), [Lucas Antunes](https://github.com/LucasGSAntunes) e [Pedro Lucas](https://github.com/lucasdray) |
| 31/07/2024 | `0.3`  | Criação das User Storys e Backlog                      | [Alexandre Beck](https://github.com/zzzBECK), [Leandro Almeida](https://github.com/leanars), [Lucas Antunes](https://github.com/LucasGSAntunes) e [Pedro Lucas](https://github.com/lucasdray) |