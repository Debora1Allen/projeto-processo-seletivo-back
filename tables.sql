drop table if exists fornecedores;

drop table if exists usuarios;

create table usuarios (
  id serial primary key,
  nome text NOT NULL,
  nome_empresa text NOT NULL,
  email text UNIQUE NOT NULL,
  senha text NOT NULL,
);

create table fornecedores(

)