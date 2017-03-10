var valoresComparativoDias=[];

$(document).ready(function(){
    $("[id^=consolidar_check]").each(function(){
        $(this).on('change',function(){
        var objCheck=$(this);
        var objetos=$(this).siblings();
                            
        objetos.each(function(){
            var objeto=$(this);
            if (objeto.prop("name")=="cons_selecionado")
                    objeto.prop('value',objCheck.prop('checked') ? 1 : 0);
                });        
    });
                                 
})});

$(document).ready(function(){
    $("[id^=comparativoDias_check]").each(function(){
        $(this).on('change',function(){
        var objCheck=$(this);
        var objetos=$(this).siblings();
                            
        objetos.each(function(){
            var objeto=$(this);
            if (objeto.prop("name")=="compDias_selecionado")
                    objeto.prop('value',objCheck.prop('checked') ? 1 : 0);
                });        
    });
                                 
})});

$(document).ready(function(){
    $('#confirma_Comp_dia').on('click',function(){
       event.preventDefault();        
        
       $('#bloco_top5_vendedores').prop('hidden',true);
       $('#bloco_top5_grupos').prop('hidden',true);
       $('#bloco_top5_produtos').prop('hidden',true);
       $('#bloco_movimento_diario').prop('hidden',true);
       $('#bloco_movimento_do_dia').prop('hidden',true);
       $('#bloco_clientes_do_dia').prop('hidden',true);
       $('#bloco_faturamento_mes').prop('hidden',true);
       $('#bloco_faturamento_hoje').prop('hidden',true);
       $('#bloco_faturamento_retroativo').prop('hidden',false);        
        
        /*
        var valores=[
          ['Dias', 'Loja 1', 'Loja 2', 'Loja 3'],
          ['01', 1000, 400, 200],
          ['02', 1170, 460, 250],
          ['03', 660, 1120, 300],
          ['04', 1030, 540, 350]
        ];
        
        */
        var form_comparar_dias=$('#form_comparar_dias').serializeArray();
                
        $.ajax({
            method: 'POST',
            dataType: "json",
            data: form_comparar_dias ,
            url:'/comparativoDias',
            complete: function(valores){
                //console.log('retorno requisição ajax');
                //console.log(valores);
                //valoresComparativoDias=valores;
                
                var dados=valores.responseJSON;
                var dadosArray=[];
                
                var lojas=[];
                //var diasMovimentos[];
                
                lojas.push('Dias');
                
                for(i in dados){
                    lojas.push(dados[i].loja);
                }
                
                dadosArray.push(lojas);
                    
                for (i in dados){
                    var diaMovimento=dados[i].dia_movimento;  
                    
                    var movimentos=[];
                    for(inn in dados){
                        movimentos.push(dados[inn].movimento);
                    }
                    diasMovimentos.push(diaMovimento,movimentos);
                }
                
                google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                   'Comparativo por Dias X Lojas',
                                                   'horizontal',
                                                    dadosArray,
                                                    document.getElementById('barchart_material_dias'))); 
            }
        });
       
    });
});

$(document).ready(function(){
    $('#confirma_Comp_meses').on('click',function(){
       event.preventDefault();        
        
       $('#bloco_top5_vendedores').prop('hidden',true);
       $('#bloco_top5_grupos').prop('hidden',true);
       $('#bloco_top5_produtos').prop('hidden',true);
       $('#bloco_movimento_diario').prop('hidden',true);
       $('#bloco_movimento_do_dia').prop('hidden',true);
       $('#bloco_clientes_do_dia').prop('hidden',true);       
       $('#bloco_faturamento_retroativo').prop('hidden',true);
       $('#bloco_faturamento_mes').prop('hidden',false);
        
        var valores=[
          ['Meses', 'Loja 1', 'Loja 2', 'Loja 3'],
          ['01', 1000, 400, 200],
          ['02', 1170, 460, 250],
          ['03', 660, 1120, 300],
          ['04', 1030, 540, 350]
        ];
                
       google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                 'Comparativo por Meses X Lojas',
                                                 'horizontal',
                                                 valores,
                                                 document.getElementById('barchart_material_meses'))); 
     
       
    });
});




$(document).ready(function(){
    $('#confirma_Comp_meses').on('click',function(){
       event.preventDefault();        
        
       $('#bloco_top5_vendedores').prop('hidden',true);
       $('#bloco_top5_grupos').prop('hidden',true);
       $('#bloco_top5_produtos').prop('hidden',true);
       $('#bloco_movimento_diario').prop('hidden',true);
       $('#bloco_movimento_do_dia').prop('hidden',true);
       $('#bloco_clientes_do_dia').prop('hidden',true);       
       $('#bloco_faturamento_retroativo').prop('hidden',true);
       $('#bloco_faturamento_hoje').prop('hidden',true);
        
       $('#bloco_faturamento_mes').prop('hidden',false);
        
        var valores=[
          ['Meses', 'Loja 1', 'Loja 2', 'Loja 3'],
          ['01', 1000, 400, 200],
          ['02', 1170, 460, 250],
          ['03', 660, 1120, 300],
          ['04', 1030, 540, 350]
        ];
                
       google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                 'Comparativo por Meses X Lojas',
                                                 'horizontal',
                                                 valores,
                                                 document.getElementById('barchart_material_meses'))); 
     
       
    });
});



$(document).ready(function(){
    $('#confirma_Comp_hoje').on('click',function(){
       event.preventDefault();        
        alert('Item indisponível');
       /* 
       $('#bloco_top5_vendedores').prop('hidden',true);
       $('#bloco_top5_grupos').prop('hidden',true);
       $('#bloco_top5_produtos').prop('hidden',true);
       $('#bloco_movimento_diario').prop('hidden',true);
       $('#bloco_movimento_do_dia').prop('hidden',true);
       $('#bloco_clientes_do_dia').prop('hidden',true);       
       $('#bloco_faturamento_retroativo').prop('hidden',true);
       $('#bloco_faturamento_mes').prop('hidden',true);
       $('#bloco_faturamento_hoje').prop('hidden',false);
        
        var valores=[
          ['Meses', 'Loja 1', 'Loja 2', 'Loja 3'],
          ['01', 1000, 400, 200],
          ['02', 1170, 460, 250],
          ['03', 660, 1120, 300],
          ['04', 1030, 540, 350]
        ];
                
       google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                 'Comparativo por Dias X Lojas',
                                                 'horizontal',
                                                 valores,
                                                 document.getElementById('barchart_diaX_lojas'))); 
        
        
        google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                 'Comparativo por Meses X Lojas',
                                                 'horizontal',
                                                 valores,
                                                 document.getElementById('barchart_mesesX_lojas'))); 
        
        google.charts.setOnLoadCallback(drawChart4('Nome do Grupo/Empresas',
                                                 'Comparativo por Ano X Lojas',
                                                 'horizontal',
                                                 valores,
                                                 document.getElementById('barchart_anoX_lojas')));
                                                 
                                                 */
        
    });
});