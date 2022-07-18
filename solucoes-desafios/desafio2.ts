enum Trabalho{
  Atriz = 'Atriz',
  Padeiro = 'Padeiro'
}

interface IPessoa {
  nome:string,
  idade: number,
  profissao: Trabalho
}

const pessoa1 = {} as IPessoa
pessoa1.nome = "maria"
pessoa1.idade = 29
pessoa1.profissao = Trabalho.Atriz

const pessoa2 = {} as IPessoa
pessoa2.nome = "roberto"
pessoa2.idade = 19
pessoa2.profissao = Trabalho.Padeiro

const pessoa3:IPessoa = {
  nome: "laura",
  idade: 32,
  profissao: Trabalho.Atriz
};

const pessoa4:IPessoa = {
  nome: "carlos",
  idade: 19,
  profissao: Trabalho.Padeiro
}
