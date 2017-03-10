create table filtro_lojas_movimentos_dia(id_usuario int REFERENCES usuario(id_usuario),
                                         id_loja int REFERENCES loja(id_loja));
                                         
create table filtro_lojas_filtro_dias(id_usuario int REFERENCES usuario(id_usuario),
                                      data_selecionada datetime);
                                                                               
alter table filtro_lojas_movimentos_dia add constraint fk_usuario_filtro_lojas_movimentos_dia foreign key (id_usuario) references usuario(id_usuario);                                         
alter table filtro_lojas_movimentos_dia add constraint fk_loja_filtro_lojas_movimentos_dia foreign key (id_loja) references loja(id_loja);
alter table filtro_lojas_filtro_dias add constraint fk_usuario_filtro_lojas_filtro_dias foreign key (id_usuario) references usuario(id_usuario);                                         
                                         
                                        
create table filtro_lojas_filtro_meses(id_usuario int REFERENCES usuario(id_usuario),
                                       data_selecionada_inicial datetime,
                                       data_selecionada_final datetime);
                                       
                                       
                                       
                                         
alter table filtro_lojas_filtro_meses add constraint fk_usuario_filtro_lojas_filtro_meses foreign key (id_usuario) references usuario(id_usuario);                                         
                                         
-- drop table filtro_lojas_movimentos_dia;
-- drop table filtro_lojas_movimentos_meses;
-- drop table filtro_lojas_filtro_meses

/*
++1. LIMPAR filtro_lojas_movimentos_dia E filtro_lojas_filtro_dias ;
 2. incluir lojas selecionadas em filtro_lojas_movimentos_dia
 3. INCLUIR FILTROS de dias em filtro_lojas_filtro_dias
 4. executar chamada de consulta da proc;
 */
 
 
select * from filtro_lojas_movimentos_dia;
select * from filtro_lojas_filtro_dias;


create table filtro_lojas_movimentos_meses(id_usuario int REFERENCES usuario(id_usuario),
                                           id_loja int REFERENCES loja(id_loja));

 -- alter table filtro_lojas_movimentos_meses add constraint fk_usuario_filtro_lojas_movimentos_mes foreign key (id_usuario) references usuario(id_usuario);                                         
 -- alter table filtro_lojas_movimentos_meses add constraint fk_loja_filtro_lojas_movimentos_mes foreign key (id_loja) references loja(id_loja);

select * from movimentos_dia

-- truncate table movimentos_mes
-- select * from filtro_lojas_movimentos_meses
-- select * from movimentos_mes











