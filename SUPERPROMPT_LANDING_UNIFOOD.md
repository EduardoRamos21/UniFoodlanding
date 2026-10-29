# UNIFOOD --- Superprompt para crear la landing page

> **Uso:** copia el prompt de la sección 1 en Cursor/tu agente de
> código. Mantén este archivo en el repositorio como
> `docs/LANDING_UNIFOOD.md` o úsalo como especificación.\
> **Fuente de producto:** `MVP_UNIFOOD.md`.\
> **Diseño:** respetar el `design.md` / `desing.md` existente (buscar
> ambas variantes de nombre antes de asumir que no existe).

------------------------------------------------------------------------


## A. Antes de programar: inspección obligatoria


2.  Busca y lee por completo:
    -   `MVP_UNIFOOD.md` y/o su ubicación real.
    -   El archivo de diseño existente, aunque esté escrito como
        `design.md`, `desing.md` o tenga otro nombre.
    -   `README.md`, `package.json`, configuración de TypeScript y
        cualquier sistema de componentes/tokens.


5.  Antes de editar, entrega un plan breve con:
    -   dirección visual propuesta;
    -   stack y estructura de archivos;
    -   secciones de la landing;
    -   animaciones GSAP previstas;
    -   assets necesarios;
    -   riesgos y decisiones pendientes.
6.  Espera aprobación si el flujo de trabajo del proyecto exige
    aprobación antes de editar. Si el usuario ya aprobó la
    implementación, procede en fases pequeñas.

## B. Fuente de verdad y reglas del producto

`MVP_UNIFOOD.md` es la fuente de verdad para las funcionalidades. No
inventes capacidades.

UNIFOOD permite que los estudiantes: - consulten cafeterías disponibles
en su universidad/campus; - exploren menús, categorías, precios y
disponibilidad; - hagan pedidos anticipados; - revisen el estado de sus
pedidos y su historial; - conozcan los pasos para recoger su pedido.

También ofrece a las cafeterías: - administración de productos,
categorías, precios e disponibilidad; - recepción y gestión de
pedidos; - actualización de estados durante la preparación; - reportes
básicos de pedidos e importes registrados.

La plataforma está concebida para múltiples universidades, campus y
cafeterías.

### Restricciones no negociables

-   El MVP **no procesa pagos electrónicos**. No muestres botones de
    "Pagar ahora", logos de tarjetas, checkout, wallets ni afirmaciones
    de pagos integrados.
-   No prometas entrega a domicilio, repartidores, GPS, cupones, puntos,
    reseñas, chat, notificaciones push ni otras funciones fuera del MVP.
-   No prometas tiempos de preparación exactos ni "cero filas" como
    garantía.
-   No afirmes que los importes de pedidos son dinero cobrado. Si
    muestras métricas conceptuales, usa "pedidos registrados" o "importe
    de pedidos", nunca "ingresos cobrados" como hecho.
-   No inventes cifras de usuarios, cafeterías, universidades, pedidos,
    ahorro de tiempo, testimonios, logos de instituciones, premios ni
    porcentajes.
-   Si todavía no hay información real para mostrar, crea una
    **demostración visual claramente ilustrativa** con etiquetas como
    "Vista de ejemplo" o "Datos ilustrativos". No presentes datos
    inventados como métricas reales.
-   No afirmes "accesibilidad total". Puedes explicar que pedir por
    adelantado puede reducir desplazamientos y esperas, y que la
    accesibilidad debe validarse con usuarios reales.
-   No conectes la landing con Supabase ni solicites datos personales
    innecesarios para una simple página informativa.
-   Los CTA deben llevar a destinos reales disponibles. Si aún no
    existen app publicada, formulario o correo de contacto, deja una
    configuración clara y documentada para añadirlos; no inventes
    enlaces, direcciones ni endpoints.
-   No cambies el sistema de diseño existente por preferencia personal.
    Si una decisión entra en conflicto con una regla del producto,
    conserva la intención visual pero respeta el producto.

## C. Objetivo de la landing

La página debe responder, en este orden, estas preguntas del visitante:

1.  ¿Qué es UNIFOOD?
2.  ¿Qué problema resuelve en mi día universitario?
3.  ¿Cómo funciona para estudiantes?
4.  ¿Qué gana una cafetería al utilizarlo?
5.  ¿Puedo confiar en que es una propuesta seria?
6.  ¿Cómo puedo probarlo, conocerlo o contactar al equipo?

Debe comunicar una idea principal: **organizar los pedidos de cafeterías
universitarias para que estudiantes y cafeterías aprovechen mejor su
tiempo.**

Audiencias principales: - **Estudiantes:** quieren consultar qué hay,
cuánto cuesta y si está disponible antes de ir a la cafetería. -
**Dueños y operadores de cafeterías:** necesitan una forma más ordenada
de recibir y preparar pedidos. - **Universidades y posibles aliados:**
necesitan entender la propuesta sin que se les prometa un panel
institucional que aún no forma parte del MVP.

La página debe hablar a las tres audiencias sin convertirse en tres
páginas inconexas. La experiencia de estudiantes debe introducir el
producto y la sección para cafeterías debe presentar la segunda cara de
la solución.

## D. Dirección creativa

Primero estudia el archivo de diseño existente. Sus tokens, colores,
tipografías, radios, sombras y reglas de composición son prioritarios.

A partir de ese sistema, crea una dirección visual con estas
cualidades: - moderna, editorial y cálida; - premium, limpia y con
personalidad; - universitaria sin clichés de campus, birretes o dibujos
infantiles; - relacionada con comida y tecnología sin parecer una app de
delivery genérica; - visualmente rica, pero con jerarquía, espacio
negativo y lectura rápida; - consistente entre escritorio, tablet y
móvil.

### Hero visual

El hero debe mostrar la propuesta de UNIFOOD en segundos. Combina el
titular con una composición visual del producto: por ejemplo, una vista
de menú digital, tarjetas de productos, precios, disponibilidad y una
tarjeta de seguimiento del pedido. La interfaz de muestra debe parecer
parte de un producto real, no un conjunto de cajas aleatorias.

Puedes crear una composición tipo "product showcase" con tarjetas
superpuestas, profundidad y movimiento ligero. Usa fotografías
apetitosas y de buena calidad solo si mejoran la composición y tienen
licencia/uso apropiado; optimízalas y evita que la página dependa de
imágenes externas inestables. Si no hay assets reales, crea una UI de
demostración con componentes HTML/CSS y datos explícitamente
ilustrativos.

Evita: - gradients genéricos por toda la página; - glassmorphism
excesivo; - sombras gigantes; - emojis como sustituto de iconografía; -
animaciones constantes; - carruseles automáticos; - secciones repetidas
que solo cambian el color; - fotos de stock que no conecten con el
producto; - una captura ficticia presentada como screenshot oficial de
la app.

## E. Estructura requerida de la página

Construye una landing de una sola página con navegación clara. Puedes
ajustar el orden si mejora la narrativa, pero conserva estos objetivos.

### 1. Header

-   Marca tipográfica o logo existente de UNIFOOD.
-   Enlaces ancla: "Cómo funciona", "Para estudiantes", "Para
    cafeterías" y "Preguntas frecuentes".
-   CTA principal contextual: "Conocer UNIFOOD" o "Contactar al equipo".
-   Header sticky solo si aporta valor; al desplazarse, transición sutil
    de fondo/borde.
-   Menú móvil accesible, funcional y fácil de cerrar.

No inventes un logo final. Si no hay logo, crea un wordmark tipográfico
temporal y fácil de sustituir.

### 2. Hero: propuesta de valor

Usa el titular principal sugerido en el archivo de copy de este mismo
documento:

**"Tu pausa en la universidad, mejor organizada."**

Subtítulo sugerido:

"Consulta menús y precios, pide antes de llegar y sigue la preparación
de tu pedido. UNIFOOD conecta a estudiantes y cafeterías universitarias
en un solo lugar."

CTA principal: "Descubrir cómo funciona"\
CTA secundario: "¿Tienes una cafetería?"

Debajo puede ir una microfrase honesta: "Menús claros. Pedidos
anticipados. Una mejor forma de organizar la pausa."

El hero debe tener una jerarquía tipográfica potente, un ancho de
lectura controlado y una composición de producto que se entienda sin
leer demasiado.

### 3. Banda de beneficios

Tres ideas cortas: - "Consulta antes de ir" - "Pide con anticipación" -
"Sigue el estado de tu pedido"

No uses estadísticas falsas ni logotipos de universidades como prueba
social.

### 4. Sección problema → solución

Explica situaciones reconocibles: - llegar sin saber qué hay
disponible; - perder tiempo esperando sin conocer el estado del
pedido; - depender de procesos desorganizados en la cafetería.

Transforma cada problema en una mejora concreta que UNIFOOD sí ofrece.
Evita dramatizar o afirmar que todos los campus sufren exactamente lo
mismo.

### 5. Cómo funciona para estudiantes

Representa el flujo en tres o cuatro pasos: 1. Elige tu campus y una
cafetería disponible. 2. Explora el menú, los precios y la
disponibilidad. 3. Arma tu pedido y confirma los detalles. 4. Consulta
el estado y recógelo siguiendo las indicaciones de la cafetería.

Acompaña los pasos con una representación visual coherente de la
interfaz. No simules pagos electrónicos ni afirmes que la recogida
funciona igual en todas las cafeterías.

### 6. Showcase del producto

Dedica una sección visual importante a mostrar el producto: - menú con
categorías; - tarjetas de comida con nombre, precio y disponibilidad; -
resumen de pedido; - estados como "Pendiente", "En preparación" y "Listo
para recoger".

Puedes animar el cambio entre estados como demostración visual, pero la
demo debe quedar identificada como ilustrativa y no debe aparentar que
está conectada a un pedido real. Respeta las reglas de estados descritas
en el MVP.

### 7. Sección para cafeterías

Titular sugerido: **"Menos desorden en los pedidos. Más claridad en la
operación."**

Beneficios: - organiza los pedidos en una cola; - actualiza el estado de
preparación; - gestiona menú, precios y disponibilidad; - consulta
reportes básicos de pedidos e importes registrados.

Incluye un CTA específico como "Quiero conocer UNIFOOD para mi
cafetería". No prometas aumento de ventas, reducción cuantificada de
costos ni una suscripción automatizada ya disponible. Si el precio
comercial se menciona, debe tratarse como una propuesta exploratoria y
no como tarifa definitiva. Preferentemente, no mostrar precios hasta que
el equipo los confirme.

### 8. Sección de valor compartido

Cuenta que UNIFOOD busca coordinar mejor la experiencia de quienes piden
y quienes preparan. Puedes presentar dos columnas ---"Para estudiantes"
y "Para cafeterías"--- con beneficios diferentes, sin duplicar
exactamente las secciones anteriores.

### 9. FAQ

Incluye respuestas concisas, alineadas con el MVP: - ¿Qué es UNIFOOD? -
¿Puedo consultar los precios antes de pedir? - ¿Puedo seguir el estado
de mi pedido? - ¿Puedo pagar desde UNIFOOD? - ¿UNIFOOD entrega a mi
salón o domicilio? - ¿Cómo puede integrarse una cafetería? - ¿UNIFOOD
está disponible en todas las universidades?

Respuestas obligatorias: - Pagos: "En la versión inicial, UNIFOOD no
procesa pagos electrónicos. El método de pago y recogida debe
confirmarse con cada cafetería." - Entregas: "UNIFOOD está pensado para
pedidos anticipados y recogida según las indicaciones de la cafetería;
no incluye reparto a domicilio en el MVP." - Disponibilidad: "La
disponibilidad depende de las universidades, campus y cafeterías que se
incorporen a la plataforma." No afirmes que está desplegado en campus
específicos si no se ha confirmado.

### 10. CTA final

Titular sugerido: **"La próxima pausa puede empezar antes de llegar."**

Texto: "Conoce UNIFOOD y descubre una forma más clara de conectar los
pedidos con las cafeterías universitarias."

CTA primario: "Contactar al equipo" o "Conocer el proyecto", según los
destinos reales configurados.

### 11. Footer

-   Marca UNIFOOD.
-   Enlaces a secciones de la página.
-   Contacto solo si existe un dato real.
-   Aviso breve de que la disponibilidad depende de las cafeterías
    participantes.
-   No inventes aviso legal, política de privacidad, redes sociales ni
    correo. Si hacen falta, deja placeholders explícitos en
    configuración y documenta que deben reemplazarse antes de
    producción.

## F. GSAP y animaciones de scroll

Usa GSAP con `ScrollTrigger` para crear movimiento con intención
narrativa. La página debe verse excelente incluso sin animaciones.

Animaciones recomendadas: 1. **Entrada inicial del hero:** aparición
escalonada del eyebrow, titular, texto, CTA y showcase. Duración
contenida, easing suave y sin retrasar la interacción. 2. **Showcase del
producto:** elementos del menú entran con stagger leve y profundidad
discreta. 3. **Revelado de secciones:** fade + desplazamiento vertical
corto cuando el contenido entra en viewport. 4. **Pasos de
funcionamiento:** los pasos se revelan progresivamente; en escritorio,
se puede animar una línea de progreso si no dificulta la lectura. 5.
**Producto/estados:** transición de tarjetas entre estados de pedido
como demo visual, sin ciclos infinitos ni movimiento distractor. 6.
**Sección para cafeterías:** composición visual con un
desplazamiento/parallax mínimo y controlado, solo si se mantiene
rendimiento. 7. **Header:** cambio de estilo al hacer scroll si el
diseño lo requiere. 8. **Microinteracciones:** hover/focus de botones y
tarjetas con CSS preferentemente; GSAP solo donde aporte valor real.

### Reglas técnicas de GSAP

-   Usa la integración correcta para el framework seleccionado. Si usas
    React/Next.js, emplea `gsap.context()` o `useGSAP` si ya está
    instalado o si instalarlo está justificado.
-   Registra `ScrollTrigger` una sola vez en el lugar apropiado.
-   Limpia contextos, timelines y triggers al desmontar componentes;
    evita listeners y animaciones duplicadas durante hot reload.
-   No crees animaciones globales que bloqueen el scroll.
-   Evita animar propiedades costosas de forma continua; prioriza
    `transform` y `opacity`.
-   No uses scroll-jacking ni captures el scroll nativo.
-   No ocultes contenido esencial si JavaScript no carga.
-   Respeta `prefers-reduced-motion`: para usuarios que prefieren
    movimiento reducido, desactiva o simplifica animaciones y evita
    parallax.
-   Asegura que el contenido siga siendo accesible con teclado y lector
    de pantalla.
-   No animes cada elemento por separado sin una jerarquía clara.
-   En móvil, reduce o elimina efectos pesados.
-   No hagas autoplay de video con sonido.
-   No uses GSAP para cosas que CSS resuelve mejor.

## G. Stack y arquitectura web

Primero inspecciona el repositorio. Si no existe una web de marketing,
propón una aplicación web separada del cliente Expo. Para una landing
independiente, el default recomendado es: - Next.js con App Router; -
TypeScript estricto; - CSS Modules, Tailwind o la solución ya adoptada
por el proyecto, sin añadir dos sistemas de estilos innecesarios; -
GSAP + ScrollTrigger para animaciones de scroll; - componentes
reutilizables, semánticos y tipados; - imágenes optimizadas con las
herramientas del framework cuando corresponda.

No migres ni reescribas la app móvil. No conectes Supabase solo por
tenerlo en la aplicación principal. Una landing informativa no necesita
acceso a la base de datos para presentar el producto.

Organiza el código de forma proporcionada, por ejemplo: - `app/` para
ruta y layout; - `components/landing/` para secciones; -
`components/ui/` para elementos reutilizables; - `lib/` para
configuración y utilidades; - `public/` para assets; - `styles/` o
tokens según el sistema existente.

No impongas esta estructura si el repositorio ya tiene una convención
mejor.

## H. Calidad visual y responsive

-   Diseña primero una composición desktop sólida y después adapta el
    contenido a móvil; no reduzcas simplemente todo a una columna sin
    reconsiderar jerarquía.
-   Comprueba anchos de 360 px, 390 px, tablet, laptop y pantallas
    amplias.
-   Evita desbordamientos horizontales, títulos cortados, tarjetas fuera
    de pantalla y saltos de layout.
-   Mantén los párrafos con longitud razonable y una escala tipográfica
    consistente.
-   Los botones deben tener estados hover, focus-visible, active y
    disabled cuando aplique.
-   El menú móvil debe ser navegable por teclado y lector de pantalla.
-   Usa HTML semántico, contraste suficiente y targets táctiles
    adecuados.
-   Añade `alt` descriptivo a imágenes informativas; imágenes
    decorativas deben ignorarse por lectores de pantalla.
-   No uses imágenes como texto.
-   Optimiza imágenes, fuentes y carga inicial.
-   Evita CLS, dependencias innecesarias y paquetes pesados.
-   La página debe tener una versión funcional y legible con JavaScript
    desactivado o si las animaciones fallan.

## I. SEO y metadatos

Implementa: - título SEO en español, por ejemplo: "UNIFOOD \| Pedidos
para cafeterías universitarias"; - meta description clara y no
exagerada; - Open Graph y social preview con un asset real o uno
diseñado para el proyecto; - favicon solo si existe o puede crearse a
partir de la marca aprobada; - headings con jerarquía semántica; -
enlaces internos correctos; - `lang="es"` y configuración regional
adecuada; - canonical solo cuando el dominio definitivo sea conocido; -
sitemap/robots solo si encajan con el despliegue real.

No inventes un dominio de producción ni datos estructurados que no
correspondan al producto.

## J. CTAs y configuración

Centraliza los destinos de los CTA en una configuración para poder
cambiarlos sin buscar URLs por todo el código. Usa enlaces ancla cuando
no exista todavía un flujo real.

Si el destino final (app, formulario, correo o dominio) no está
definido: - utiliza un CTA honesto que lleve a una sección existente,
o - deja una variable claramente identificada para configurar el destino
después; - documenta el cambio necesario antes de producción. No
muestres enlaces rotos ni formularios que aparenten enviar información
sin hacerlo.

## K. Validación antes de entregar

Al terminar: 1. Ejecuta las comprobaciones disponibles: lint, typecheck,
build y tests si existen. 2. Corrige errores introducidos. 3. Revisa
responsive, accesibilidad, consola, navegación y rendimiento. 4.
Verifica que todas las animaciones se limpian correctamente y respetan
`prefers-reduced-motion`. 5. Revisa el texto contra `MVP_UNIFOOD.md`
para confirmar que no se inventaron capacidades. 6. Busca cualquier
mención a pagos, entregas, métricas, universidades, precios o
testimonios que pudiera inducir a error. 7. Resume: - archivos
creados/modificados; - decisiones de diseño; - animaciones
implementadas; - comandos ejecutados y resultados reales; - assets o
enlaces pendientes; - cómo ejecutar la web localmente.

**No afirmes que compiló o que funciona si no ejecutaste las
comprobaciones correspondientes.** Trabaja por etapas, mantén el código
mantenible y entrega una landing visualmente distintiva, clara y
honesta.

------------------------------------------------------------------------

# 2. COPYWRITING: TEXTO PROPUESTO PARA LA LANDING

Este apartado es la fuente inicial de textos. Se puede ajustar el tono,
pero no se deben añadir promesas de producto no confirmadas.

## Mensaje central

**UNIFOOD organiza la conexión entre estudiantes y cafeterías
universitarias.**

Idea emocional: una pausa universitaria debería ser más sencilla de
organizar. El producto ayuda a consultar antes, pedir con anticipación y
saber en qué estado está el pedido.

## Hero

**Eyebrow:**\
PEDIDOS UNIVERSITARIOS, MEJOR ORGANIZADOS

**H1:**\
Tu pausa en la universidad, mejor organizada.

**Descripción:**\
Consulta menús y precios, pide antes de llegar y sigue la preparación de
tu pedido. UNIFOOD conecta a estudiantes y cafeterías universitarias en
un solo lugar.

**CTA principal:**\
Descubrir cómo funciona

**CTA secundario:**\
¿Tienes una cafetería?

**Microcopy:**\
Menús claros. Pedidos anticipados. Una mejor forma de organizar la
pausa.

## Beneficios rápidos

**Consulta antes de ir**\
Revisa opciones, precios y disponibilidad antes de desplazarte a la
cafetería.

**Pide con anticipación**\
Arma tu pedido y confirma sus detalles para que la cafetería pueda
gestionarlo.

**Sigue el estado**\
Consulta si tu pedido está pendiente, en preparación o listo para
recoger.

## Problema y solución

**Título:**\
Menos incertidumbre antes de tu próxima pausa.

**Introducción:**\
Entre clases, pendientes y cambios de horario, cada minuto cuenta.
UNIFOOD te ayuda a consultar la oferta de las cafeterías y organizar tu
pedido antes de llegar.

**Tarjeta 1 --- Antes de salir**\
**¿Qué hay hoy y cuánto cuesta?**\
Consulta el menú, los precios y la disponibilidad sin depender de
encontrar toda la información al llegar.

**Tarjeta 2 --- Al pedir**\
**Que tu pedido tenga un siguiente paso claro.**\
Confirma los artículos y consulta el estado del pedido mientras la
cafetería lo gestiona.

**Tarjeta 3 --- Del otro lado del mostrador**\
**Pedidos más fáciles de organizar.**\
La cafetería puede centralizar los pedidos, actualizar su preparación y
mantener su menú al día.

## Cómo funciona

**Título:**\
De elegir tu comida a recoger tu pedido.

**Subtítulo:**\
Un flujo pensado para que sepas qué estás pidiendo y qué ocurre después.

**Paso 1 --- Elige dónde pedir**\
Selecciona tu universidad, campus y una cafetería disponible.

**Paso 2 --- Explora el menú**\
Consulta categorías, productos, precios y disponibilidad.

**Paso 3 --- Confirma tu pedido**\
Revisa los artículos, las cantidades y el total antes de confirmar.

**Paso 4 --- Consulta el estado**\
Sigue las actualizaciones y recoge el pedido según las indicaciones de
la cafetería.

**Nota de producto:**\
El método de pago y las indicaciones de recogida dependen de la
cafetería. UNIFOOD no procesa pagos electrónicos en el MVP.

## Showcase de producto

**Eyebrow:**\
TODO MÁS CLARO, DESDE EL MENÚ

**Título:**\
Lo que necesitas saber antes de pedir.

**Descripción:**\
Menú, precios, disponibilidad y estado del pedido en una experiencia
fácil de seguir.

**Etiquetas para una demo ilustrativa:**\
- Menú de ejemplo - Disponibilidad ilustrativa - Pedido de
demostración - Estado de ejemplo

**Estados que puede mostrar la demo:**\
Pendiente → Aceptado → En preparación → Listo para recoger

No presentes la demostración como si fuera un pedido real ni sugieras
que el estado cambia por una conexión backend si no existe.

## Para cafeterías

**Eyebrow:**\
UNIFOOD PARA CAFETERÍAS

**Título:**\
Menos desorden en los pedidos. Más claridad en la operación.

**Descripción:**\
Administra tu menú, revisa los pedidos que llegan y actualiza su estado
desde un flujo de trabajo más organizado.

**Beneficio 1 --- Tu menú al día**\
Actualiza productos, precios, categorías y disponibilidad.

**Beneficio 2 --- Pedidos en un solo flujo**\
Consulta los pedidos de tu cafetería y gestiona sus estados durante la
preparación.

**Beneficio 3 --- Una visión más clara**\
Revisa reportes básicos de pedidos e importes registrados en UNIFOOD.

**CTA:**\
Quiero conocer UNIFOOD para mi cafetería

**Microcopy opcional:**\
¿Administras una cafetería universitaria? Conversemos sobre cómo podría
encajar UNIFOOD en tu operación.

## Para estudiantes

**Título:**\
Más claridad para elegir. Más información para recoger.

**Descripción:**\
Encuentra las opciones disponibles, revisa el precio antes de confirmar
y consulta el estado de tu pedido sin perder de vista el siguiente paso.

## Valor compartido

**Título:**\
Una mejor coordinación empieza con información clara.

**Columna estudiantes:**\
**Decide antes de llegar.**\
Consulta opciones, compara precios y sigue el estado de tu pedido.

**Columna cafeterías:**\
**Organiza cada pedido.**\
Gestiona el menú y actualiza el estado de preparación desde un flujo
centralizado.

## Preguntas frecuentes

**¿Qué es UNIFOOD?**\
UNIFOOD es una plataforma para consultar menús de cafeterías
universitarias, hacer pedidos anticipados y seguir su estado. También
ofrece herramientas para que las cafeterías administren productos y
pedidos.

**¿Puedo consultar los precios antes de pedir?**\
Sí. Puedes consultar los precios publicados en el menú de las cafeterías
disponibles en la plataforma.

**¿Puedo seguir el estado de mi pedido?**\
El producto contempla estados para que puedas consultar el avance del
pedido, desde que se registra hasta que está listo para recoger.

**¿Puedo pagar desde UNIFOOD?**\
En la versión inicial, UNIFOOD no procesa pagos electrónicos. El método
de pago y recogida debe confirmarse con cada cafetería.

**¿UNIFOOD entrega a mi salón o domicilio?**\
UNIFOOD está pensado para pedidos anticipados y recogida según las
indicaciones de la cafetería; no incluye reparto a domicilio en el MVP.

**¿Cómo puede integrarse una cafetería?**\
El equipo de UNIFOOD puede conversar con la cafetería para conocer su
operación y evaluar los siguientes pasos. Configura un canal de contacto
real antes de publicar esta invitación.

**¿UNIFOOD está disponible en todas las universidades?**\
La disponibilidad depende de las universidades, campus y cafeterías que
se incorporen a la plataforma.

## CTA final

**Título:**\
La próxima pausa puede empezar antes de llegar.

**Descripción:**\
Conoce UNIFOOD y descubre una forma más clara de conectar los pedidos
con las cafeterías universitarias.

**Botón:**\
Contactar al equipo

**Alternativa si todavía no hay contacto público:**\
Conocer cómo funciona

## Footer

**Descriptor:**\
Pedidos anticipados y gestión de cafeterías universitarias.

**Nota:**\
La disponibilidad y las condiciones de recogida dependen de las
cafeterías participantes.

------------------------------------------------------------------------

# 3. GUÍA DE TONO Y MICROCOPY

## Personalidad verbal

-   Clara, cercana y segura.
-   Moderna, pero no llena de anglicismos.
-   Universitaria, sin infantilizar a los estudiantes.
-   Persuasiva sin exagerar beneficios.
-   Centrada en claridad, organización y conveniencia.

## Palabras que sí encajan

"consulta", "menú", "disponibilidad", "pedido anticipado", "estado del
pedido", "recoger", "cafetería universitaria", "organizar", "más
claridad", "antes de llegar".

## Evitar

-   "Revoluciona para siempre la alimentación universitaria".
-   "Adiós a las filas para siempre".
-   "Entrega instantánea".
-   "Paga en un clic".
-   "La plataforma número uno".
-   "Ahorra 80 % de tu tiempo".
-   "Miles de estudiantes ya la usan".
-   "Aumenta tus ventas garantizado".
-   "Disponible en todas las universidades".

Estas frases implican promesas o pruebas que no están documentadas.

## Microcopy para componentes de demostración

-   "Vista de ejemplo"
-   "Menú ilustrativo"
-   "Disponible" / "Agotado"
-   "Revisa tu pedido"
-   "Pedido registrado"
-   "En preparación"
-   "Listo para recoger"
-   "Consulta las indicaciones de la cafetería"

No uses textos como "Pago aprobado", "Tu repartidor está llegando" o
"Llegará en 5 minutos".

------------------------------------------------------------------------

# 4. CHECKLIST DE PUBLICACIÓN

-   [ ] El `design.md` / `desing.md` se leyó y respetó.
-   [ ] El copy se contrastó con `MVP_UNIFOOD.md`.
-   [ ] No hay estadísticas, testimonios, instituciones o clientes
    inventados.
-   [ ] No se afirma que UNIFOOD procesa pagos electrónicos.
-   [ ] No se ofrece entrega a domicilio.
-   [ ] Las demos están identificadas como ilustrativas.
-   [ ] Los CTA llevan a destinos reales o a anclas funcionales.
-   [ ] Contacto, dominio, redes sociales y políticas se configuraron
    con datos reales.
-   [ ] Se comprobó el diseño en móvil, tablet y escritorio.
-   [ ] `prefers-reduced-motion` funciona.
-   [ ] GSAP limpia correctamente los `ScrollTrigger`.
-   [ ] La página sigue siendo legible si falla JavaScript.
-   [ ] Se revisaron contraste, teclado, foco visible y semántica.
-   [ ] Se ejecutaron lint, typecheck y build; los resultados se
    reportaron con honestidad.
