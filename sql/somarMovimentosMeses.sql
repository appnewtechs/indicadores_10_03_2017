USE indicadores;
DROP PROCEDURE somarMovimentosMeses;
CREATE PROCEDURE somarMovimentosMeses()
BEGIN
  truncate table movimentos_mes;
  
  INSERT INTO movimentos_mes (movimento_mes,id_loja,mes)
  select sum(a.totalVenda) movimento_mes,
          b.id_loja,          
          MONTH(a.dataVenda) mes
  from movimento a
  INNER JOIN loja b
  on b.cnpj=a.loja
  group by b.id_loja,
           MONTH(a.dataVenda);
END;