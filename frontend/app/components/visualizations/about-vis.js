import Component from '@ember/component';

export default Component.extend({
  descriptions: {
    "visualizations/sentiment-analysis" : {
      "nome": "Matriz de Análise de Sentimento",

      "objetivo": `<p>
          Esta análise leva em conta o processamento de padrões textuais determinando
          um <b>modelo</b> que é capaz de indicar o quanto um <b>comentário</b> indica uma
          <b>opinião positiva</b> de um participante em um artigo de lei.
        <p>`,

      "representacao": `<p>
          Os artigos estão dispostos em colunas e o participantes estão
          dispostos em linhas. A cor do quadrado define a <b>probabilidade</b> de uma
          <b>opinião positiva</b> dos comentários. A <b>legenda</b> apresenta o percentual
          dessa probabilidade distribuída no intervalo de cores.
        </p>

        <p>
          Quanto mais próximo a <b>1</b>,
          maior a probabilidade de que os comentários representam uma opinião positiva
          do participante. A visualização classifica os participantes e os artigos de acordo
          com a positividade dos comentários.
        </p>`
    },

    "visualizations/correlation-matrix" : {
      "nome": `Matriz de Coocorrência de Comentários`,

      "objetivo": `<p>
          Esta análise leva em conta o processamento de padrões textuais determinando um
          modelo que seja capaz de indicar um <b>índice de interesse</b>, isto é, busca-se calcular a
          <b>densidade</b> dos comentários de um grupo de cidadãos em um conjunto de artigos de
          anteprojetos de lei.
        </p>`,

      "representacao": `<p>
          Os Artigos de lei estão dispostos em colunas e os grupos de
          cidadãos estão definidos
          em linhas. Cada visualização apresenta uma lista com diversos modelos de padrões de
          relacionamentos entre os comentários dos cidadãos e as diversas seções dos artigos de lei.
          Cada modelo de padrões gera uma matriz de coocorrência diferente.
          A matriz de uma coocorrência dos comentários de um conjunto cidadãos muda levando
          em conta o conjunto de artigos de lei comentados que a compõe de acordo com o
          <b>interesse</b>
          dos comentários dos cidadãos.
        </p>
        <p>
          Ex.: Um conjunto de artigos de leis podem ter um maior número
          de comentários por apenas um conjunto específico de cidadãos. Logo, a matriz de
          coocorrência desse subconjunto difere da matriz de coocorrência global, pois o índice de
          interesse identificado é diferente.
        </p>
        <p>
          A <b>legenda</b> apresenta a distribuição do número de comentários num intervalo de
          tonalidade de cores. O interesse dos cidadãos aos artigos está definido pela cor
          do quadrado, sendo a densidade de comentários proporcional a tonalidade.
        </p>`
    },

    "visualizations/topicos-vis" : {
      "nome": `Visualização de Tópicos`,

      "objetivo": `<p>
          Sumarizar os comentários referentes a um mesmo tópico de interesse, identificando
          o grupo de termos descritivos que representam seu conteúdo semântico. Os documentos dos
          quais os tópicos são extraídos, são classificados em <b>eixos de debates.</b>
        </p>`,

      "representacao": `<p>
          Cada linha da tabela representa o <b>tópico</b> o qual os documentos pertencem.
          A coluna <b>eixos</b> classifica os documentos de acordo com os <b>eixos em debate</b>
          identificados nos artigos dos anteprojetos de lei.
          O <b>tamanho</b> das barras representa o número de comentários recebidos
          Por cada documento, sumarizados na coluna <b>comentários</b>. A coluna <b>termos
          Mais descritivos</b> reúne as palavras que mais representam o conteúdo semântico do
          Tópico de interesse. O <b>tamanho</b> dos termos apresenta a representatividade da palavra
          Dentro do conteúdo semântico do tópico.
        </p>`
    },

    "visualizations/part-item" : {
      "nome": `Grafo de Participação (Participantes e Artigos)`,

      "objetivo": `<p>
          Esta análise apresenta a interligação entre os participantes e os artigos comentados.
        </p>`,

      "representacao": `<p>
          O grafo entre os participantes e os artigos comentados forma um dígrafo,
          isto é, não existem arestas que orientem o relacionamento entre participantes ou
          artigos isoladamente; um participante só se relaciona com artigos e vice-versa.
        </p>
        <p>
          Os participantes estão dispostos em losangos e os artigos em círculos verdes,
          a aresta entre eles representa o número de comentários.
          Quanto <b>maior a espessura</b> de uma aresta, maior o número de comentários
          realizados por um participantes em um artigo.
        </p>

        <p>
          Ao passar o mouse por
          cima de <b>qualquer nó</b>, aparece o respectivo nome (artigo ou participante)
          juntamente com número de vizinhos, sendo os mesmos destacados da representação.
          Para tornar esse destaque persistente, basta clicar duas vezes sobre o elemento escolhido.
        </p>`
    },

    "visualizations/graph-canvas-full" : {
      "nome": `Grafo de Coocorrência dos Conjuntos de Termos Frequentes (global)`,

      "objetivo": `<p>
          Esta análise apresenta a frequência da relação de ocorrência entre as palavras ou
          sequências lógicas filtradas pelo usuário com as demais palavras da base de dados sob a
          condição de que todas estejam interligadas.
        </p>`,

      "representacao": `<p>
          Cada ocorrência é representada por <b>nós</b> e sua <b>área</b>
          é proporcional a frequência de ocorrência. As arestas retratam a <b>coocorrência</b>
          entre as palavras, e sua espessura é proporcional a frequência dessa <b>coocorrência</b>.
        </p>

        <p>
          Em um Grafo Global, a interligação de palavras <b>co-ocorrentes</b> ocorre entre
          o conjunto de dados que satisfazem as palavras ou relacionamentos lógicos do filtro
          realizado e todos os outros termos mais frequentes da base de forma que todos os
          elementos estejam interligados.
        </p>

        <p>
          As palavras que foram utilizadas no filtro que satisfazem a relação de
          co-ocorrência são destacados em nós brancos. Ao clicar duas vezes sob qualquer nó,
          seus relacionamentos são destacados. A <b>espessura da aresta</b> representa a
          <b>frequência</b> dos correlacionamentos.
        </p>

        <p>
          Ao passar o <i>mouse</i> por cima do nó,
          a palavra relacionada fica em destaque apresentando o número elementos interligados,
          ou seja seus vizinhos.
        </p>`
    },

    "visualizations/graph-canvas" : {
      "nome": `Grafo de Coocorrência dos Conjuntos de Termos Frequentes (filtrado)`,

      "objetivo": `<p>
          Esta análise apresenta a frequência da relação de ocorrência entre as palavras ou
          sequências lógicas filtradas pelo usuário com as demais palavras da base de dados sob a
          condição de que todas estejam interligadas.
        </p>`,

      "representacao": `<p>
          Cada ocorrência é representada por <b>nós</b> e sua <b>área</b>
          é proporcional a frequência de ocorrência. As arestas retratam a <b>coocorrência</b>
          entre as palavras, e sua espessura é proporcional a frequência dessa <b>coocorrência</b>.
        </p>

        <p>
          Em um grafo filtrado, a interligação de palavras <b>co-ocorrentes</b>
          ocorre apenas entre o conjunto de dados que satisfazem as palavras ou
          relacionamentos lógicos do filtro realizado pelo usuário.
        </p>

        <p>
          As palavras que foram utilizadas no filtro que satisfazem a relação de
          co-ocorrência são destacados em nós brancos. Ao clicar duas vezes sob qualquer nó,
          seus relacionamentos são destacados. A <b>espessura da aresta</b> representa a
          <b>frequência</b> dos correlacionamentos.
        </p>

        <p>
          Ao passar o <i>mouse</i> por cima do nó,
          a palavra relacionada fica em destaque apresentando o número elementos interligados,
          ou seja seus vizinhos.
        </p>`
    },

    "visualizations/wordtree-diagram" : {
      "nome": `Visualização Wordtree`,

      "objetivo": `<p>
          Esta análise apresenta uma representação em <b>árvore (grafo)</b>
          da <b>frequência</b> de <b>palavras ou sequências</b> em um texto.
          A árvore de palavras é formada por todas as palavras da base que satisfazem
          os relacionamentos lógicos utilizados no filtro de busca, para o caso da
          utilização do filtro.
        </p>`,

      "representacao": `<p>
          O tamanho das palavras destacadas na árvore está vinculado sua a
          frequência na base. As frases, ou o conjunto de palavras relacionadas estão ligadas
          por arestas. Ao clicar na palavras esses nós podem ser restringidos, possibilitando
          ao usuário uma visualização mais específica.
        </p>`
    },

    "visualizations/search-tool" : {
      "nome": ``,

      "objetivo": ``,

      "representacao": ``
    },

  },

  didReceiveAttrs: function() {
    this._super(...arguments);

    var descriptions = this.get("descriptions");
    var vis = this.get("vis");

    this.set("nome", descriptions[vis]["nome"]);
    this.set("objetivo", descriptions[vis]["objetivo"]);
    this.set("representacao", descriptions[vis]["representacao"]);
  },
});
