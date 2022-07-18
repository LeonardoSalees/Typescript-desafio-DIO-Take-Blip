"use strict";
var Trabalho;
(function (Trabalho) {
    Trabalho["Atriz"] = "Atriz";
    Trabalho["Padeiro"] = "Padeiro";
})(Trabalho || (Trabalho = {}));
const pessoa1 = {};
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = Trabalho.Atriz;
const pessoa2 = {};
pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = Trabalho.Padeiro;
const pessoa3 = {
    nome: "laura",
    idade: 32,
    profissao: Trabalho.Atriz
};
const pessoa4 = {
    nome: "carlos",
    idade: 19,
    profissao: Trabalho.Padeiro
};
