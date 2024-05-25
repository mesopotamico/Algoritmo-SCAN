El algoritmo SCAN, también conocido como algoritmo Elevador, es un algoritmo de planificación de discos utilizado en sistemas operativos para la gestión eficiente de las solicitudes de acceso a disco. Su objetivo principal es minimizar el tiempo de búsqueda de las solicitudes de E/S (entrada/salida) en un disco.

La idea principal detrás del algoritmo SCAN es que el cabezal de lectura/escritura del disco se mueve en una dirección particular (hacia adelante o hacia atrás) a lo largo del disco, atendiendo las solicitudes de E/S en su camino. Cuando se alcanza el final del disco en una dirección, el cabezal de lectura/escritura se invierte y se mueve en la dirección opuesta.

Aquí hay una descripción más detallada del funcionamiento del algoritmo SCAN:

Inicialización: El cabezal de lectura/escritura comienza en un determinado cilindro del disco (generalmente el cilindro más cercano a donde se encuentra actualmente).

Movimiento del cabezal: El cabezal de lectura/escritura se mueve en una dirección particular (hacia adelante o hacia atrás) a lo largo del disco, atendiendo las solicitudes de E/S en su camino. Las solicitudes se atienden en orden de llegada y se procesan a medida que el cabezal se desplaza.

Final del disco: Cuando se alcanza el final del disco en una dirección (ya sea el extremo externo o el extremo interno), el cabezal se invierte y comienza a moverse en la dirección opuesta.

Atención de solicitudes en el camino inverso: A medida que el cabezal de lectura/escritura se mueve en la dirección opuesta, atiende las solicitudes de E/S que quedaron pendientes en ese lado del disco.

Continuación del movimiento: El cabezal continúa moviéndose hacia adelante y hacia atrás a lo largo del disco, atendiendo las solicitudes de E/S en su camino, hasta que no queden más solicitudes pendientes.

El algoritmo SCAN tiene la ventaja de evitar el "efecto de la fila larga", donde las solicitudes de E/S en la parte posterior de la cola pueden tener que esperar indefinidamente si se utiliza un algoritmo de planificación de disco más simple como FCFS (First-Come, First-Served). Al mover el cabezal en ambas direcciones, SCAN distribuye más equitativamente el tiempo de espera de las solicitudes de E/S en el disco.
