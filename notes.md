## Feature: Fazer pedidos

* Cancelamento de pedidos
* Calcular tempo estimado de entrega
* Carrinho de compras
* Notificação de confirmação de pedidos
* Adicionar Comentário
* Exibir histórico de pedidos

## Stakeholders:

* **Cliente**: É quem vai, efetivamente, fazer o pedido. Quer alguma coisa entregue na sua casa.
* **Restaurante**: Onde o pedido vai ser realizado, precisar ser capaz de receber os pedidos, interagir com eles (confirmar, avisar de problemas/faltas, etc.) e envia-los através de um entregador
* **Entregador**: É quem vai realizar a entrega do pedido, precisa saber quando há um pedido novo, e onde precisa busca-lo e entrega-lo.

## "Caminho Feliz":

### Cliente

1. Cliente entra no app
2. Seleciona uma loja
3. Escolhe os itens do cardápio para adicionar ao carrinho
    1. (Opcional) Remove itens do carrinho
4. Vê um resumo do estado atual do pedido
5. Escolhe uma forma de pagamento
6. (Opcional) Adiciona algum comentário
7. Finaliza a compra
    1. (Opcional) Cancela a compra

### Restaurante

1. Restaurante recebe um pedido (detalhamento dos itens)
    1. (Opcional) Pedido é cancelado antes de ser confirmado
2. Confirma que pode e vai preparar o pedido
    1. (Opcional) Restaurante deseja informar da incapacidade de atender ao pedido, ou a alguns itens do pedido
3. (Opcional) Recebe cancelmento do pedido pelo cliente
4. Marca o pedido como pronto para a entrega
5. Passa o pedido para o entregador

### Entregador

1. Entregador recebe informação do pedido (id + restaurante e endereço)
    1. (Opcional) Pedido é cancelado pelo cliente ou pelo restaurante
2. Vai até o local e confirma que está no local para receber o pedido
3. Recebe o pedido do restaurante e sai para a entrega
4. Chega no local de entrega e informa que está no local de entrega
5. Realiza a entrega ao cliente

## Perguntas para os Stakeholders:

*(As respostas apresentadas aqui foram dadas pelo monitor Thiago Araujo através do canal da equipe no Discord)*

1. O carrinho do cliente pode ter produtos de mais de uma loja (como no Rappi), ou deve conter apenas produtos de uma loja (estilo iFood)?

    ***R:** A ideia é ser estilo Ifood, nesse caso os produtos são só de uma loja mesmo*

    1. ~~No caso de seguir o modelo do Rappi, como isso deve ser comunicado ao cliente (tipo, ele deve receber um pop-up informando que está adicionando produtos de mais de uma loja, ou perceber e lidar com isso é responsabilidade dele?)~~

    2. No caso de seguir o modelo do iFood, nós devemos deixar um carrinho atrelado a loja (de forma que na hora que o cliente sair da loja na qual está colocando produtos e entrar em outra um novo carrinho independente do que ele estava montando até então é criado), ou vai ser um carrinho só por cliente, e quando ele tentar adicionar algo de outra loja nós limpamos o carrinho/pedimos que ele faça isso antes?

        ***R:** A segunda opção parece ser mais interessante, pois por ela vocês conseguem avisar ao cliente que o carrinho terá que ser limpo, para poder adicionar algum produto de outra loja. Esse aviso é importante para não ser algo tão direto.*

2. Parte de realizar o pedido é comunicar ao restaurante, e receber a confirmação do restaurante, além de selecionar um entregador e lhe passar as informações também. Isso são coisas que ficarão, também, sob nossa responsabilidade?

    ***R:** Não consigo responder essa pergunta completamente agora, pois vamos  implementar (monitores) algo que vai se comunicar com o projeto de vocês. A minha sugestão é levantarem o que seria enviado/recebido para o restaurante e entregador (algo bem básico mesmo, tipo vamos passar o id, endereço do cliente para o restaurante....)*

3. O cliente vai ter a opção de deixar um comentário no pedido?

    ***R:** Sim, seria bem interessante*

    1. Se sim, esse comentário será atrelado direto ao pedido apenas, ou será permitido adicionar um comentário para cada item do carrinho independentemente, por exemplo?

        ***R:** Imagino que seja melhor deixar algo mais geral, nesse caso seria para o pedido como um todo*

4. Quanto a notificação que deve ser entregue ao cliente, como deverá ser feita essa notificação? SMS, email, notificação do navegador apenas?
   
    ***R:** Email e notificação no navegador já seria suficiente*

    1. Isso deve ser feito no momento em que o cliente confirma o pedido, ou apenas no momento em que o pedido é confirmado pelo restaurante?

        ***R:** O ideial seria após receber  a confirmação do restaurante*

5. Que tipo de informação nós vamos poder ter para calcular o tempo de espera? O restaurante confirma o tempo de preparo no momento da confirmação do pedido, ou ele informa, a priori, um tempo médio de preparo de pedido?

    ***R:** O ideal é a estimativa de tempo levar em consideração o tempo de preparo do restaurante e  a distância entre o cliente e restaurante, assim seria possível ter uma estimativa. Ele informaria o tempo médio para o preparo.*

    1. Se for considerando um tempo associado ao restaurante, isso é algo que precisa ser atualizado com o tempo, a medida que pedidos são realizados e entregues?

        ***R:** Como seria algo informado pelo restaurante não influencia tanto no cálculo de vocês, o que iria mudar é a estimativa para a entrega ser feita a partir da distância entregador/cliente.*

6. Dado que o cliente pode cancelar o pedido, até que momento esse cancelamento pode ser realizado?

    ***R:** Antes que o pedido saia para entrega.*

    1. Apenas até que o restaurante confirme que está fazendo o preparo, até que o pedido esteja pronto, até que o mesmo saia para entrega?

        ***R:** Acima*

    2. No caso do cancelamento, o valor é inteiramente reembolsado (ou a cobrança completamente evitada), ou haverá alguma penalidade ao cliente (como os R$6 do uber, caso o cancelamento ocorra após um certo tempo)

        ***R:** Acho que seria interessante ter penalidade a partir de certo momento, por exemplo, caso o cliente cancele o pedido quando estiver em preparo não teria taxa, caso já esteja pronto seria descontado 10%, algo nesse sentido.*

7. Quando ao uso de entregadores, qual modelo deve ser usado: Um único entregador é escolhido, e ele pode aceitar ou rejeitar a entrega, passando assim até que um aceite, ou o pedido é apresentado para X entregadores, baseado na distância do restaurante, e o primeiro que aceitar fica com o pedido?

    ***R:** A segunda opção é melhor*

8. Se houver um problema com a entrega e ela não for efetuada, como isso deve ser processado? O cliente recebe o valor integral de volta, ele pode escolher manter o pagamento e "renovar" o pedido?

    ***R:** Seria legal dar essas duas opções para o cliente, ele pode receber o valor integral ou efetuar novamente o pedido (renovar)*

    1. No caso de entregas incompletas, ou com problema, como isso deve ser feito? Reembolso do valor completo? Crédito no app?

        ***R:** O crédito no app parece ser mais interessante*

9.  Quando o restaurante recebe o pedido, caso ele não seja capaz de realizar o pedido (seja completamente, ou seja apenas não conseguindo entregar alguns itens), como isso deve ser tratado? O pedido é sempre cancelado como um todo, o restaurante oferece algumas substituições, o cliente tem a opção de trocar por itens que adicionem ao mesmo valor?

    ***R:** Nesse caso, seria massa apresentar essas opções para o cliente (cancelar o pedido e receber o reembolso, substituir os itens em falta por outros ou gerar crédito no valor dos itens que não serão entregues)*