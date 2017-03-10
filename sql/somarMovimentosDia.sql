USE indicadores;
DROP PROCEDURE somarMovimentosDia;
CREATE PROCEDURE somarMovimentosDia()
BEGIN
  truncate table movimentos_dia;
  
  INSERT INTO movimentos_dia (movimento_dia,id_loja,dia_movimento)
  select sum(a.totalVenda) movimento_dia,
          b.id_loja,
          a.dataVenda
          dia_movimento
  from movimento a
  INNER JOIN loja b
  on b.cnpj=a.loja
  group by b.id_loja,
           a.dataVenda;
END;