create table movimentos_dia (movimento_dia float not null default 0,
                             dia_movimento datetime not null,
                             id_loja int REFERENCES loja(id_loja));
                   
 alter table movimentos_dia add constraint fk_loja_movimentos_dia foreign key (id_loja) references loja(id_loja);
                             

create table movimentos_mes (movimento_mes float not null default 0,
                             mes varchar(50),
                             id_loja int REFERENCES loja(id_loja));
                   
 alter table movimentos_mes add constraint fk_loja_movimentos_mes foreign key (id_loja) references loja(id_loja);