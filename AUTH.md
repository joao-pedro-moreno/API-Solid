# Autenticação

## Basic Auth

O método Basic Auth exige que o usuário inclua suas credenciais no cabeçalho de cada requisição. As informações de autenticação são codificadas em base64 e inseridas da seguinte forma:

Header => Authorization: Basic (credenciais em base64)

## JWT (JSON Web Token)

No processo de autenticação utilizando JWT, quando um usuário faz login, as credenciais (normalmente e-mail e senha) são enviadas para o backend, que valida o login. Se as credenciais forem válidas, o backend gera um token único conhecido como JSON Web Token (JWT). Este token é "stateless", o que significa que não é armazenado em nenhum tipo de estrutura de persistência de dados, como um banco de dados.

Ao criar o token, o backend utiliza uma palavra-chave (string) para assiná-lo. O JWT é composto por três partes: cabeçalho (header), payload e assinatura. Estas partes são concatenadas e formam o token, que é retornado ao cliente e deve ser incluído no cabeçalho das requisições subsequentes da seguinte maneira:

E-mail/senha => header.payload.sign

Essa abordagem oferece uma solução mais segura em comparação com Basic Auth, pois as informações são transmitidas de forma criptografada e o servidor pode verificar a validade do token sem a necessidade de consultar um banco de dados, tornando o processo mais eficiente.
