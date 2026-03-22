# 🔷 SafeScan ID

SafeScan ID é uma aplicação web simples baseada em QR Code, desenvolvida para identificar rapidamente pessoas e fornecer informações essenciais em situações de emergência. O sistema permite escanear um QR code, carregar uma imagem ou inserir manualmente um ID para acessar dados importantes como contacto do responsável, notas médicas e instruções de emergência.

## 🚀 Funcionalidades

O sistema oferece leitura de QR code via câmera, upload de imagens com QR code, busca manual por ID, exibição de perfil com nome, idade e foto, acesso rápido ao contacto do responsável, visualização de notas médicas e instruções de emergência, além de um botão de alerta de emergência (simulado). A interface é responsiva e funciona bem em dispositivos móveis.

## 🧩 Como Funciona

Cada pessoa possui um ID único (por exemplo: U001). Quando um QR code é escaneado, o sistema extrai esse ID e procura na base de dados interna. Caso o ID exista, o perfil correspondente é exibido com todas as informações relevantes.

## 📁 Estrutura do Projeto

O projeto é composto por um único arquivo principal (index.html), que contém toda a estrutura HTML, estilos CSS e lógica em JavaScript.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando HTML5, CSS3 com Bootstrap 5 para estilização, JavaScript puro (Vanilla JS) e a biblioteca html5-qrcode para leitura dos códigos QR.

## ▶️ Como Executar

Para executar o projeto, basta fazer o download ou clonar o repositório, abrir o arquivo index.html em um navegador e permitir o acesso à câmera quando solicitado.

## 🧪 IDs para Teste

Você pode testar o sistema usando os seguintes IDs: U001 (criança) e U002 (idoso).

## ⚠️ Observação Importante

Atualmente, o sistema utiliza uma base de dados simulada diretamente no código. Em um ambiente real, seria necessário integrar um backend com base de dados segura, autenticação de usuários e mecanismos reais de envio de alertas de emergência.

## 🌍 Possíveis Aplicações

Este sistema pode ser utilizado para identificação de crianças, apoio a idosos (especialmente com demência), uso em emergências médicas, escolas ou qualquer situação onde identificação rápida seja necessária.

## 🔮 Melhorias Futuras

Como evolução do projeto, podem ser adicionadas funcionalidades como integração com backend (Node.js ou Firebase), envio real de alertas (SMS ou WhatsApp), partilha de localização em tempo real, geração de QR codes para usuários, sistema de login e um painel administrativo.

## 👨‍💻 Autor

Simão Baptista Sunga
