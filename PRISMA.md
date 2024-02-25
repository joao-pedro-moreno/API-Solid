# Prisma

## Init

npx prisma init --datasource-provider ``database``

## Migrations

npx prisma migrate dev
npx prisma migrate deploy

## Prisma Studio

npx prisma studio

## Relacionamentos

1-1 => Um registro em uma tabela se relaciona com exatamente um registro em outra ou na mesma tabela.

1-N => Um registro em uma tabela pode se relacionar com vários registros em outra tabela, enquanto um registro na segunda tabela se relaciona com no máximo um registro na primeira tabela.

N-N => Muitos registros em uma tabela podem se relacionar com muitos registros em outra tabela, criando uma relação muitos para muitos. Geralmente, isso é implementado usando uma tabela de associação intermediária.
