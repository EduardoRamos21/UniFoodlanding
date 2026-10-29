# UNIFOOD — Documento maestro del MVP
**Versión:** 1.0  
**Estado:** Base funcional para desarrollo  
**Plataforma:** React Native + Expo + TypeScript  
**Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions cuando aplique)  
**Idioma inicial:** Español  
**Moneda:** MXN  
**Producto:** Plataforma de gestión de pedidos y ventas para cafeterías universitarias

---

## 1. Visión del producto

UNIFOOD conecta a estudiantes con cafeterías universitarias para consultar menús, conocer precios y disponibilidad, hacer pedidos anticipados y seguir su preparación sin tener que esperar en filas innecesariamente.

También ofrece a las cafeterías herramientas para administrar su catálogo, aceptar y preparar pedidos, organizar la demanda y consultar métricas básicas. El propietario de UNIFOOD administra universidades, campus, cafeterías, acceso a la plataforma y planes comerciales.

### Problemas que resuelve
- **Asimetría de información:** el estudiante puede revisar menú, precios y disponibilidad antes de desplazarse.
- **Filas y tiempos de espera:** permite realizar pedidos anticipados.
- **Accesibilidad:** reduce desplazamientos y esperas, especialmente útiles para personas con movilidad reducida. No se debe prometer accesibilidad total sin pruebas con usuarios y cumplimiento de estándares.
- **Desorganización operativa:** la cafetería dispone de un flujo de pedidos y estados unificado.
- **Falta de datos:** reportes básicos ayudan a entender demanda y ventas registradas en UNIFOOD.

### Propuesta de valor
- **Estudiantes:** menú claro, pedido anticipado, seguimiento del pedido y menos incertidumbre.
- **Cafeterías:** gestión de menú, disponibilidad, pedidos y reportes.
- **UNIFOOD:** software e infraestructura con posibilidad de monetización por suscripción y, más adelante, contratos institucionales.

---

## 2. Alcance del MVP

Construir primero un producto pequeño, seguro y funcional. No añadir funciones futuras hasta completar y probar el flujo principal de punta a punta.

### Incluido en el MVP
1. Inicio de sesión con Google mediante Supabase Auth.
2. Perfil de usuario y selección de universidad/campus cuando sea necesario.
3. Catálogo de universidades, campus y cafeterías activas.
4. Consulta de menú por cafetería, categorías, precio y disponibilidad.
5. Carrito de una sola cafetería por pedido.
6. Confirmación de pedido con resumen de artículos, cantidades, precios y total.
7. Creación de pedido y generación de folio.
8. Estados del pedido y seguimiento en tiempo real o actualización automática como alternativa.
9. Panel operativo para cafetería: pedidos, detalle y cambio de estado.
10. Administración del catálogo: categorías, productos, precios, imágenes y disponibilidad.
11. Superadmin: crear y administrar universidades, campus, cafeterías, usuarios administrativos y estado comercial de cuentas.
12. Reportes básicos de pedidos e importe de ventas registrados en UNIFOOD.
13. Reglas de seguridad en Supabase RLS y validación de permisos en backend.
14. Estados vacíos, carga, errores, confirmaciones y accesibilidad básica.
15. Datos semilla de desarrollo y documentación de configuración.

### Fuera del MVP (no implementar sin aprobación explícita)
- Pagos con tarjeta, wallet o procesamiento de pagos.
- Repartidores, entregas a domicilio o seguimiento GPS.
- Chat entre estudiante y cafetería.
- Cupones, puntos, cashback y programa de lealtad.
- Reseñas públicas y calificaciones.
- Facturación fiscal automática.
- Inventario avanzado, recetas, costos de producción o proveedores.
- Multiidioma.
- Suscripciones cobradas automáticamente a cafeterías.
- Panel institucional con datos personales de estudiantes.
- Notificaciones push, salvo que se aprueben como siguiente iteración.
- Cancelación automática por temporizador o reembolsos.

**Importante:** en el MVP, “ventas” significa el importe de pedidos registrados en UNIFOOD; no significa que UNIFOOD procese el cobro. La cafetería y el estudiante deben ver claramente si el pago se realiza en caja/recogida y qué método acepta cada cafetería. No simular pagos electrónicos.

---

## 3. Actores y permisos

Implementar permisos con roles explícitos y alcance por entidad. Ocultar botones en la interfaz no es una medida de seguridad suficiente: la autorización real debe imponerse en la base de datos y en el backend.

### 3.1 Estudiante (`student`)
Puede:
- Iniciar sesión con Google.
- Consultar universidades, campus, cafeterías, menús y disponibilidad.
- Añadir productos al carrito, modificar cantidades y quitar artículos.
- Confirmar pedidos.
- Ver sus propios pedidos y su estado.
- Ver el detalle histórico de sus pedidos.

No puede:
- Editar productos o precios.
- Consultar pedidos de otros estudiantes.
- Cambiar el estado de un pedido.
- Acceder a vistas administrativas.

### 3.2 Operador de cafetería (`cafeteria_staff`)
Puede, dentro de las cafeterías asignadas:
- Ver pedidos de su cafetería.
- Aceptar/rechazar pedidos cuando el flujo lo permita.
- Cambiar estados de preparación y entrega.
- Gestionar productos, precios, categorías y disponibilidad si tiene permiso de gestión.
- Consultar reportes de su cafetería.

No puede:
- Ver pedidos de otras cafeterías.
- Crear universidades o campus.
- Cambiar su rol o asignarse permisos.
- Alterar el precio histórico de pedidos ya creados.

Se recomienda separar permisos en `cafeteria_staff` y `cafeteria_manager` si el proyecto necesita distinguir personal operativo de gerente. Para el MVP puede utilizarse un único rol de personal y un permiso `can_manage_menu` asignado por el superadmin.

### 3.3 Superadministrador de UNIFOOD (`superadmin`)
Puede:
- Crear, editar, activar/desactivar universidades, campus y cafeterías.
- Asignar usuarios administrativos a cafeterías y otorgar permisos.
- Consultar métricas globales necesarias para operar la plataforma.
- Gestionar el estado comercial de una cafetería (por ejemplo, prueba, activa, suspendida).
- Consultar registros de auditoría.

No debe:
- Poder ver contraseñas ni tokens privados.
- Exponer datos personales innecesarios.
- Usar la app móvil como única barrera de autorización.

El primer superadmin debe crearse mediante un procedimiento controlado fuera del registro público. Nunca permitir que alguien se convierta en superadmin enviando un valor desde el cliente.

### 3.4 Universidad / administrador institucional (futuro)
No es necesario para el MVP salvo que se apruebe expresamente. Si se incorpora después, deberá tener alcance limitado a su propia universidad y preferentemente estadísticas agregadas.

---

## 4. Jerarquía multiinstitución

La estructura principal será:

`UNIFOOD → Universidad → Campus → Cafetería → Menú / Pedidos`

- Una universidad puede tener varios campus.
- Un campus pertenece a una sola universidad.
- Una cafetería pertenece a un campus.
- Una cafetería puede tener muchos productos, categorías y pedidos.
- Un usuario puede tener pedidos como estudiante y, si está autorizado, permisos administrativos.
- Un usuario administrativo puede estar asignado a una o varias cafeterías.
- El modelo debe permitir más de una universidad sin mezclar datos entre ellas.

No asumir que el correo del estudiante determina automáticamente la universidad, a menos que se defina una lista de dominios institucionales verificados. Para el MVP, permitir seleccionar universidad/campus o asignarlos mediante invitación. El acceso administrativo debe ser siempre por invitación/asignación controlada.

---

## 5. Flujo principal del estudiante

1. Abre UNIFOOD y se autentica con Google.
2. Completa los datos mínimos del perfil y selecciona universidad/campus si no tiene uno asignado.
3. Ve las cafeterías disponibles del campus.
4. Abre una cafetería y consulta sus categorías, productos, precios y disponibilidad.
5. Añade productos al carrito.
6. El carrito solo admite productos de **una cafetería a la vez**. Si intenta añadir un producto de otra cafetería, pedir confirmación para vaciar/cambiar el carrito; nunca mezclar pedidos de cafeterías diferentes.
7. Revisa cantidades, subtotal, cargos aplicables (si no hay cargos en MVP, no mostrarlos) y total.
8. Confirma el pedido y el método de recogida/pago definido por la cafetería.
9. El backend valida productos, precios, disponibilidad, cafetería activa y campus.
10. El pedido se guarda en una transacción consistente y recibe un folio único legible.
11. El estudiante ve el pedido en “Mis pedidos” y recibe actualizaciones de estado.
12. Cuando está listo, recoge el pedido siguiendo las instrucciones de la cafetería.
13. El pedido pasa a entregado/completado y queda en el historial.

No confiar en los totales, precios, estados ni permisos enviados por el cliente. El backend debe volver a calcular y validar toda información crítica.

---

## 6. Flujo de cafetería

1. Personal autorizado inicia sesión.
2. Consulta la cola de pedidos de su cafetería.
3. Abre un pedido y revisa artículos, cantidades, notas permitidas y método de recogida.
4. Acepta o rechaza el pedido dentro del plazo operativo que defina la cafetería.
5. Si lo acepta, lo marca como en preparación.
6. Al terminar, lo marca como listo para recoger.
7. Cuando lo entrega, lo marca como entregado/completado.
8. Si hay un problema, puede rechazarlo con un motivo predefinido o texto corto, sin borrar el registro.
9. El panel muestra conteos básicos por estado y ventas registradas por periodo.

La disponibilidad de productos debe poder modificarse rápidamente. Al agotarse un producto, debe dejar de estar disponible para nuevos pedidos, pero permanecer en pedidos históricos.

---

## 7. Estados y transiciones de pedidos

Estados sugeridos:
- `pending`: pedido creado, esperando decisión de la cafetería.
- `accepted`: aceptado por la cafetería.
- `preparing`: en preparación.
- `ready`: listo para recoger.
- `completed`: entregado al estudiante.
- `rejected`: rechazado por la cafetería.
- `cancelled`: cancelado conforme a las reglas definidas.

Transiciones válidas del MVP:
- `pending → accepted`
- `pending → rejected`
- `pending → cancelled` solo si la política lo permite y la cafetería aún no lo ha aceptado.
- `accepted → preparing`
- `accepted → cancelled` solo con autorización/regla explícita.
- `preparing → ready`
- `ready → completed`

Reglas:
- Un pedido terminal (`completed`, `rejected`, `cancelled`) no vuelve a un estado activo desde la app normal.
- El backend debe validar cada transición y el rol que la solicita.
- Registrar quién cambió el estado, cuándo y, si aplica, el motivo.
- Nunca permitir que el estudiante marque su pedido como `ready` o `completed`.
- Evitar que una actualización concurrente sobrescriba otra: usar actualización condicionada por estado actual o función SQL transaccional.
- No borrar pedidos para corregir errores; conservar historial y auditoría.
- Definir el tiempo de aceptación y la política de cancelación con una configuración explícita. No inventar una promesa de tiempo de preparación.

---

## 8. Carrito, precios y creación de pedidos

- Un carrito pertenece a una sesión/usuario y se mantiene localmente mientras sea apropiado; el pedido confirmado se guarda en Supabase.
- El carrito no es una fuente confiable de precios.
- El backend consulta los precios actuales y disponibilidad de cada producto.
- Validar que todos los productos estén activos, pertenezcan a la misma cafetería y estén disponibles.
- Cantidad mínima: 1; máximo razonable configurable para evitar abuso.
- Rechazar cantidades inválidas, productos desactivados y precios obsoletos con un mensaje claro.
- Guardar en `order_items` una **copia histórica** del nombre, precio unitario, cantidad y subtotal en el momento del pedido.
- Guardar subtotal y total calculados en servidor; usar tipo `numeric`/decimal para importes, no `float`.
- Usar transacción para crear pedido y sus artículos; si falla cualquier parte, no dejar un pedido incompleto.
- Generar folio no predecible o UUID como identificador técnico. El folio visible puede ser legible, pero no debe servir como autorización.
- Evitar doble envío por toques repetidos: implementar idempotencia para la operación de creación de pedido, o un mecanismo equivalente.
- Si el producto cambia de precio o se agota mientras está en el carrito, mostrar el cambio y solicitar confirmación antes de continuar.

---

## 9. Menú y productos

Cada producto debe contemplar:
- Nombre.
- Descripción opcional.
- Precio en MXN.
- Imagen opcional.
- Categoría.
- Disponibilidad (`is_available`).
- Estado activo/inactivo (`is_active`).
- Cafetería propietaria.
- Fechas de creación y actualización.

Reglas:
- Un producto inactivo no aparece para nuevos pedidos.
- Un producto no disponible puede mostrarse como agotado, pero no se puede ordenar.
- No eliminar físicamente productos que aparezcan en pedidos anteriores; desactivarlos.
- Las imágenes se almacenan en Supabase Storage con políticas de acceso y límites de tamaño/tipo.
- Validar nombre, precio positivo, longitud de descripción y formato de imagen.
- Las categorías pertenecen a una cafetería.
- Los cambios del menú no alteran los datos históricos de `order_items`.

---

## 10. Suscripción y modelo comercial

Modelo inicial propuesto:
- Suscripción mensual de cafetería: rango exploratorio de **$299–$599 MXN/mes**.
- Contrato institucional: precio negociado según alcance, campus y soporte.

Para el MVP, implementar solo el registro del estado comercial, no cobros recurrentes:
- `trial`: prueba.
- `active`: habilitada.
- `past_due`: pago pendiente (solo si se administra manualmente).
- `suspended`: suspendida.
- `cancelled`: cancelada.

Cada cafetería puede tener `plan_name`, `subscription_status`, `subscription_started_at`, `subscription_ends_at` y notas administrativas. Solo superadmin puede modificarlo en MVP.

Reglas:
- Una cafetería suspendida no acepta nuevos pedidos ni permite gestión operativa normal; definir si el menú queda visible o aparece como temporalmente no disponible.
- No afirmar que una suscripción fue cobrada si no hay integración de pagos.
- No implementar Stripe/Mercado Pago ni guardar datos de tarjetas en esta fase.
- Los reportes comerciales deben distinguir pedidos creados de pagos efectivamente cobrados, porque UNIFOOD no procesa pagos en el MVP.

---

## 11. Modelo de datos sugerido (Supabase/PostgreSQL)

Es una base inicial; ajustar los nombres al estilo del repositorio antes de crear migraciones.

### `profiles`
- `id uuid primary key references auth.users(id) on delete cascade`
- `full_name text`
- `email text`
- `avatar_url text`
- `role text` solo para rol general seguro, o preferentemente roles derivados de tablas de asignación
- `university_id uuid null`
- `campus_id uuid null`
- `created_at timestamptz`
- `updated_at timestamptz`

**Seguridad:** no permitir que un usuario cambie su propio rol mediante actualización de perfil. No confiar en `user_metadata` editable del cliente para privilegios.

### `universities`
- `id uuid primary key`
- `name text not null`
- `slug text unique`
- `logo_url text null`
- `is_active boolean default true`
- `created_at`, `updated_at`

### `campuses`
- `id uuid primary key`
- `university_id uuid not null references universities(id)`
- `name text not null`
- `address text null`
- `is_active boolean default true`
- `created_at`, `updated_at`

### `cafeterias`
- `id uuid primary key`
- `campus_id uuid not null references campuses(id)`
- `name text not null`
- `description text null`
- `location_description text null`
- `image_url text null`
- `opening_hours jsonb null` (validar estructura; no tratarlo como fuente de seguridad)
- `is_active boolean default true`
- `subscription_status text`
- `plan_name text null`
- `subscription_started_at timestamptz null`
- `subscription_ends_at timestamptz null`
- `created_at`, `updated_at`

### `cafeteria_members`
- `id uuid primary key`
- `cafeteria_id uuid not null references cafeterias(id)`
- `user_id uuid not null references profiles(id)`
- `role text not null` (`manager`, `staff`)
- `can_manage_menu boolean default false`
- `is_active boolean default true`
- `created_at`
- `unique(cafeteria_id, user_id)`

### `categories`
- `id uuid primary key`
- `cafeteria_id uuid not null references cafeterias(id)`
- `name text not null`
- `sort_order int default 0`
- `is_active boolean default true`
- `created_at`, `updated_at`

### `products`
- `id uuid primary key`
- `cafeteria_id uuid not null references cafeterias(id)`
- `category_id uuid null references categories(id)`
- `name text not null`
- `description text null`
- `price numeric(10,2) not null check (price >= 0)`
- `image_url text null`
- `is_available boolean default true`
- `is_active boolean default true`
- `created_at`, `updated_at`

### `orders`
- `id uuid primary key`
- `order_number text unique not null`
- `student_id uuid not null references profiles(id)`
- `university_id uuid not null references universities(id)`
- `campus_id uuid not null references campuses(id)`
- `cafeteria_id uuid not null references cafeterias(id)`
- `status text not null`
- `subtotal numeric(10,2) not null`
- `total numeric(10,2) not null`
- `payment_method text not null` (por ejemplo `pay_at_pickup`, si esa es la política inicial)
- `payment_status text not null default 'unpaid'` (no confundir con el estado del pedido)
- `student_note text null`
- `rejection_reason text null`
- `idempotency_key text null`
- `created_at timestamptz`
- `accepted_at timestamptz null`
- `ready_at timestamptz null`
- `completed_at timestamptz null`
- `updated_at timestamptz`

Añadir restricción única apropiada para la clave de idempotencia por estudiante si se usa. No almacenar datos de tarjeta.

### `order_items`
- `id uuid primary key`
- `order_id uuid not null references orders(id)`
- `product_id uuid null references products(id)`
- `product_name_snapshot text not null`
- `unit_price_snapshot numeric(10,2) not null`
- `quantity int not null check (quantity > 0)`
- `line_total numeric(10,2) not null`

`product_id` puede quedar nulo si el producto se elimina físicamente por una operación administrativa excepcional; se recomienda desactivar productos en lugar de eliminarlos.

### `order_status_history`
- `id uuid primary key`
- `order_id uuid not null references orders(id)`
- `previous_status text null`
- `new_status text not null`
- `changed_by uuid null references profiles(id)`
- `reason text null`
- `created_at timestamptz`

### `admin_members` o `user_roles`
- Tabla de asignaciones de roles administrativos gestionada solo por un procedimiento seguro.
- `user_id`, `role` (`superadmin`, y futuros roles institucionales), `created_at`.
- No habilitar autoasignación desde el cliente.

### Índices recomendados
- `orders(student_id, created_at desc)`
- `orders(cafeteria_id, status, created_at)`
- `products(cafeteria_id, is_active, is_available)`
- `categories(cafeteria_id, sort_order)`
- `campuses(university_id, is_active)`
- `cafeterias(campus_id, is_active)`
- `order_status_history(order_id, created_at)`

Añadir restricciones, claves foráneas, índices y migraciones SQL versionadas. No crear tablas manualmente solo desde el dashboard sin registrar el esquema en el repositorio.

---

## 12. Seguridad y RLS: requisitos obligatorios

Activar RLS en todas las tablas expuestas por la API de Supabase. Diseñar y probar políticas por tabla, operación y rol.

### Principios
- Denegar por defecto y conceder el mínimo privilegio.
- La clave `service_role` nunca debe llegar a la app móvil ni al repositorio.
- Solo las variables públicas necesarias (por ejemplo, URL y anon/publishable key) pueden estar en el cliente; la seguridad depende de RLS.
- El cliente no puede decidir su rol, cafeterías asignadas, total del pedido ni transición de estado.
- Las operaciones sensibles se ejecutan mediante funciones SQL con `security definer` cuidadosamente revisadas o Edge Functions con autenticación y validación. Si se usa `security definer`, fijar un `search_path` seguro y restringir `execute`.
- No confiar solo en ocultar pantallas o botones.
- Evitar políticas RLS recursivas. Usar funciones auxiliares seguras cuando sea necesario.
- Separar datos públicos de menú y datos privados de pedidos/perfiles.
- No exponer pedidos, notas ni datos de estudiantes a otras cafeterías.
- Validar que el usuario pertenece a la cafetería antes de consultar o modificar sus pedidos.
- Mantener secretos en variables de entorno y documentar `.env.example` sin secretos reales.
- Añadir auditoría para cambios administrativos y transiciones de pedidos.
- Aplicar límites de longitud y validaciones en cliente y servidor.
- Revisar dependencias y permisos antes de producción.

### Matriz conceptual de acceso
- Universidades/campus/cafeterías activos: lectura pública o autenticada según se defina; escritura solo superadmin.
- Menú activo: lectura para usuarios; escritura solo personal asignado con permiso.
- Perfil: lectura/escritura del propio perfil con campos permitidos; privilegios protegidos.
- Pedidos: estudiante lee solo los propios; personal lee pedidos de sus cafeterías; creación validada por función backend.
- Estado del pedido: solo personal autorizado cambia estados válidos; el estudiante solo consulta.
- Historial de estado: lectura según acceso al pedido; inserción solo por backend/transición autorizada.
- Roles y asignaciones: escritura solo superadmin/procedimiento privilegiado.
- Suscripción: lectura operativa mínima para personal autorizado; modificación solo superadmin.

Estas son reglas de diseño, no políticas RLS listas para copiar. Cursor debe generar políticas SQL explícitas y pruebas negativas para verificar que no exista acceso cruzado.

---

## 13. Autenticación Google

- Usar Supabase Auth con proveedor Google y el flujo recomendado para Expo/React Native.
- Configurar Google Cloud OAuth, redirect URLs y scheme de la app correctamente para desarrollo y builds.
- No inventar ni dejar hardcodeados client IDs/secretos; documentar qué valores debe configurar el propietario.
- Manejar sesión persistente de forma compatible con React Native y Expo.
- Restaurar sesión al abrir la app y contemplar expiración/cierre de sesión.
- Crear o actualizar `profiles` mediante trigger seguro o flujo backend confiable al registrarse.
- El registro público siempre crea un estudiante normal; nunca un administrador.
- Mostrar errores de login, cancelación del proveedor y problemas de red.
- No pedir contraseña de Google dentro de UNIFOOD.
- Documentar pasos de configuración local, Expo Go versus development build si aplica, y pruebas en dispositivo.

---

## 14. Requisitos técnicos y arquitectura

### Cliente
- React Native con Expo.
- TypeScript en modo estricto.
- Expo Router si el repositorio ya lo usa; si no, evaluar adoptarlo antes de construir navegación.
- Componentes reutilizables y separación entre pantallas, componentes, hooks, servicios y tipos.
- Validación de formularios y estados de carga/error/vacío.
- Diseño responsive para distintos tamaños de móvil y accesibilidad: contraste, tamaño táctil, etiquetas accesibles y navegación clara.
- Mantener consistencia con los archivos `design.md` existentes. Leerlos antes de diseñar o modificar UI.
- No reescribir el sistema de diseño ni sustituir pantallas aprobadas sin justificación.

### Backend
- Supabase Auth, PostgreSQL, RLS, Storage y Realtime.
- SQL versionado en `supabase/migrations`.
- Datos semilla en archivos separados, únicamente para desarrollo.
- Operaciones críticas de pedido y cambio de estado en RPC/funciones SQL o Edge Functions, según la decisión técnica documentada.
- Realtime debe limitarse a canales y datos que el usuario tiene permitido leer; no sustituye RLS ni validación de backend.

### Estructura orientativa
```text
unifood/
├── app/                         # Rutas/pantallas si se usa Expo Router
├── src/
│   ├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── student/
│   │   ├── menu/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── cafeteria/
│   │   └── superadmin/
│   ├── hooks/
│   ├── lib/                     # cliente Supabase, utilidades
│   ├── services/                # acceso a datos
│   ├── types/
│   ├── constants/
│   └── utils/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── tests/
├── docs/
│   ├── MVP_UNIFOOD.md
│   └── ...
├── .env.example
├── app.json
├── package.json
└── README.md
```
Esta estructura es orientativa: primero inspeccionar el repositorio y respetar su estructura si ya está organizada.

### Calidad
- No usar `any` salvo justificación documentada.
- No duplicar reglas de negocio en múltiples pantallas.
- Centralizar tipos, estados y validaciones.
- Manejar errores de red y reintentos con cuidado.
- No mostrar datos falsos en producción ni simular que una operación se guardó si falló.
- Añadir pruebas para reglas críticas y ejecutar lint, typecheck y tests existentes.
- Mantener dependencias mínimas y compatibles con la versión instalada de Expo.
- No instalar paquetes ni cambiar versiones principales sin explicar el motivo.
- No hacer refactors masivos sin necesidad.
- Todo cambio debe dejar el proyecto en un estado ejecutable o documentar exactamente qué falta.

---

## 15. Actualización de pedidos en tiempo real

- El estudiante solo puede suscribirse a cambios de sus propios pedidos.
- El personal solo puede recibir cambios de pedidos de las cafeterías a las que está asignado.
- Proteger las suscripciones con RLS y probar acceso cruzado.
- Si Realtime no está disponible, la pantalla debe seguir funcionando con recarga manual o actualización periódica razonable.
- Desuscribirse al abandonar pantallas para evitar conexiones duplicadas.
- La interfaz debe comunicar estados de conexión y errores sin bloquear toda la app.

---

## 16. UX, accesibilidad y estados de interfaz

Diseñar como producto real, no como maqueta:
- Inicio de sesión y onboarding cortos.
- Selección clara de campus y cafetería.
- Menú con precios legibles y productos agotados identificables.
- Carrito persistente durante la navegación y resumen antes de confirmar.
- Confirmación visual al crear el pedido, mostrando folio y siguiente paso.
- Historial de pedidos con estados y hora de última actualización.
- Panel de cafetería con cola operativa ordenada por antigüedad/prioridad definida.
- Confirmación antes de acciones delicadas como rechazar un pedido.
- Errores con lenguaje claro y una acción de recuperación.
- Estados vacíos con orientación útil.
- Compatibilidad con lectores de pantalla, contraste adecuado, objetivos táctiles amplios y texto escalable.
- No depender únicamente del color para comunicar el estado.
- No usar animaciones que bloqueen la tarea o generen mareo.
- La accesibilidad de personas con movilidad reducida es una motivación central del proyecto, así que debe validarse con pruebas reales de usabilidad.

---

## 17. Reportes del MVP

Para cada cafetería:
- Número de pedidos por día/periodo.
- Pedidos por estado.
- Importe total de pedidos registrados por periodo.
- Productos más pedidos (según artículos de pedidos).
- Exportación CSV solo si es sencilla y segura; puede dejarse para la siguiente iteración.

Reglas:
- Definir claramente qué estados entran en el total; excluir `rejected` y `cancelled`, y documentar si `completed` o todos los pedidos aceptados se consideran venta operativa.
- Mostrar “importe de pedidos” y no “dinero cobrado” mientras no exista integración de pagos.
- Filtrar por cafetería autorizada y rango de fechas.
- No exponer métricas detalladas de otras cafeterías a personal normal.
- Los reportes institucionales futuros deberán usar agregación y minimizar datos personales.

---

## 18. Observabilidad y operación

- Mensajes de error útiles sin revelar secretos ni datos personales.
- Registrar fallos de operaciones críticas en el servidor cuando corresponda.
- Auditoría de cambios de roles, estado comercial, productos y pedidos.
- No guardar tokens ni información sensible en logs.
- Documentar backups y recuperación de Supabase antes de producción.
- Definir límites y alertas de uso/costos antes de abrir el sistema a múltiples campus.
- Preparar entornos separados de desarrollo y producción.
- No utilizar datos personales reales en seed o capturas de prueba.

---

## 19. Estrategia de pruebas y criterios de aceptación

### Autenticación
- Un estudiante puede entrar con Google y cerrar sesión.
- El registro no concede privilegios administrativos.
- Una sesión válida se restaura tras reiniciar la app.

### Catálogo
- Solo se muestran cafeterías activas y productos disponibles según la vista.
- Un producto agotado/inactivo no puede comprarse aunque el cliente manipule la petición.
- El personal no puede modificar el menú de otra cafetería.

### Pedidos
- Un estudiante puede crear un pedido válido.
- El total se recalcula en servidor.
- Cambiar el precio localmente no altera el total real.
- No se puede mezclar en un pedido productos de cafeterías distintas.
- El doble toque/reintento no crea pedidos duplicados.
- Los artículos guardan snapshots de nombre/precio.
- Las transiciones inválidas se rechazan.
- Estudiante A no puede consultar pedido de estudiante B.
- Cafetería A no puede consultar ni cambiar pedidos de cafetería B.
- El estado se actualiza en la vista autorizada.

### Superadmin
- Puede crear y desactivar universidades, campus y cafeterías.
- Puede asignar personal.
- Un usuario normal no puede invocar las mismas operaciones desde la API.
- El primer superadmin se crea mediante procedimiento seguro documentado.

### Calidad
- La app arranca sin errores.
- TypeScript, lint y pruebas disponibles pasan.
- Se documentan variables de entorno y configuración OAuth.
- No hay secretos en Git.
- Migraciones SQL reproducen el esquema desde cero en un proyecto de prueba.

---

## 20. Fases recomendadas de desarrollo

### Fase 0 — Auditoría y plan
- Inspeccionar estructura, dependencias, `README` y todos los `design.md` existentes.
- Identificar qué está implementado, qué falta y qué no funciona.
- No editar archivos todavía.
- Entregar un plan de ejecución por fases, riesgos y archivos que se modificarían.

### Fase 1 — Fundamentos
- Configuración Expo/TypeScript y cliente Supabase.
- Variables de entorno y `.env.example`.
- Navegación, tema y componentes base alineados con el diseño.
- Migraciones iniciales, tipos y datos de prueba.
- Auth Google y perfiles con rol seguro.
- Políticas RLS iniciales y pruebas.

### Fase 2 — Descubrimiento de cafeterías y menú
- Universidad/campus/cafeterías.
- Categorías y productos.
- Gestión de catálogo por personal autorizado.
- Estados vacíos, carga y errores.

### Fase 3 — Carrito y pedidos
- Carrito de una cafetería.
- Validación de productos y totales en backend.
- Creación transaccional e idempotente.
- Historial y detalle del pedido.
- Pruebas de reglas de negocio y RLS.

### Fase 4 — Operación de cafetería
- Cola de pedidos.
- Transiciones válidas.
- Realtime con controles de acceso.
- Historial/auditoría de estados.

### Fase 5 — Superadmin y comercial
- Gestión de universidades, campus y cafeterías.
- Asignación de personal.
- Estado de suscripción administrado manualmente.
- Reportes globales mínimos.

### Fase 6 — Estabilización
- Pruebas de seguridad negativas.
- Pruebas en Android y iOS cuando el entorno lo permita.
- Manejo de errores, accesibilidad, rendimiento y documentación.
- Checklist de preproducción.

No avanzar a una fase siguiente si la anterior no arranca, no pasa sus pruebas críticas o deja permisos abiertos.

---

## 21. Decisiones que deben confirmarse antes de producción

Usar valores provisionales claramente documentados durante desarrollo, pero no ocultar estas decisiones:
1. ¿El pedido se paga al recoger? ¿Efectivo, terminal u otro método?
2. ¿La cafetería debe aceptar manualmente cada pedido?
3. ¿Cuánto tiempo tiene para aceptar antes de que expire?
4. ¿Puede el estudiante cancelar después de que la cafetería acepta?
5. ¿El pedido es únicamente para recoger en cafetería o se entregará en salón?
6. ¿Se exige correo institucional o cualquier cuenta Google?
7. ¿Cómo se determina la universidad/campus inicial del estudiante?
8. ¿Qué datos del estudiante necesita realmente la cafetería para entregar el pedido?
9. ¿Los usuarios de cafetería usarán la app móvil, una vista web responsive o ambas?
10. ¿Cuál es la política para pedidos rechazados y productos agotados tras confirmar?

**No bloquear el trabajo técnico por decisiones que no sean necesarias en la fase actual.** Elegir defaults reversibles para desarrollo, documentarlos y pedir confirmación cuando una decisión afecte pagos, privacidad, políticas de cancelación o experiencia de producción.

---

## 22. Instrucciones para Cursor

- Leer este documento y los `design.md` antes de tocar código.
- Inspeccionar el estado real del repositorio; no asumir que está vacío ni que usa una estructura específica.
- No generar toda la aplicación en una sola respuesta ni crear archivos indiscriminadamente.
- Primero producir un plan por fases con archivos concretos, dependencias, riesgos y pruebas.
- Implementar una fase por tarea, en cambios pequeños y revisables.
- Antes de editar, listar brevemente los archivos que se van a crear/modificar y el motivo.
- Respetar los diseños existentes. Si hay contradicción entre diseño visual y seguridad/reglas de negocio, conservar la intención visual y aplicar la regla segura.
- Para decisiones no definidas, elegir el camino más sencillo, seguro y reversible; documentarlo.
- No inventar secretos, claves, IDs OAuth ni configuración del proyecto Supabase.
- No implementar pagos reales ni funciones fuera del MVP sin autorización.
- Después de cada fase, ejecutar los comandos disponibles (lint, typecheck, tests) y reportar resultados reales; no afirmar que pasaron si no se ejecutaron.
- Corregir errores introducidos por el cambio antes de continuar.
- Actualizar documentación y checklist de aceptación.
- Si falta una credencial externa, preparar el código y explicar los pasos manuales pendientes, sin fingir que la integración quedó probada.

---

## 23. Definición de “MVP terminado”

El MVP se considera listo para una prueba piloto cuando:
- Un estudiante puede entrar con Google, elegir campus/cafetería, consultar menú y crear un pedido válido.
- La cafetería puede gestionar productos y procesar el pedido de principio a fin.
- El estudiante ve los cambios de estado y su historial.
- El superadmin puede administrar universidades, campus, cafeterías y asignaciones.
- Las reglas críticas se validan en backend y RLS impide el acceso cruzado.
- Los importes históricos son correctos aunque cambien los precios del menú.
- Los flujos críticos tienen pruebas automatizadas o una lista manual reproducible.
- La app tiene manejo de carga, errores y estados vacíos.
- El proyecto se puede configurar desde cero siguiendo el README.
- No se simulan pagos ni se presentan métricas de pedidos como cobros confirmados.


---

# PROMPT MAESTRO PARA CURSOR — UNIFOOD

Actúa como **arquitecto de software senior, ingeniero mobile full-stack y especialista en Supabase, PostgreSQL/RLS, Expo y productos SaaS multi-tenant**. Estás trabajando en UNIFOOD, una plataforma de pedidos y gestión de cafeterías universitarias.

## Contexto obligatorio
Antes de programar, lee completo:
1. `docs/MVP_UNIFOOD.md` (o la ubicación real del documento maestro).
2. Todos los archivos `design.md`, guías visuales, tokens, referencias y documentación de diseño existentes.
3. `README.md`, `package.json`, configuración de Expo, TypeScript, navegación, cliente Supabase, migraciones y código actual.

El documento maestro define la lógica y las reglas de negocio. Los archivos `design.md` definen la dirección visual. Respeta ambos. Si no están en las rutas indicadas, búscalos en el repositorio; no asumas que no existen.

## Objetivo
Construir por fases un MVP funcional, seguro, mantenible y listo para una prueba piloto de UNIFOOD usando React Native + Expo + TypeScript y Supabase (Auth, PostgreSQL, RLS, Storage y Realtime cuando corresponda).

UNIFOOD conecta:
- Estudiantes: consultan cafeterías/menús, hacen pedidos anticipados y rastrean estados.
- Personal de cafetería: administra catálogo y procesa pedidos.
- Superadmin: administra universidades, campus, cafeterías, personal y estado comercial de las cuentas.

El MVP NO procesa pagos electrónicos. No implementes pagos reales, repartidores, cupones ni funciones fuera del alcance sin autorización explícita.

## Tu primera tarea: AUDITORÍA, NO PROGRAMACIÓN
En esta primera ejecución trabaja en **modo Agent solo para inspeccionar y planear**. No edites ni crees archivos todavía.

1. Recorre el repositorio y determina el stack real, la estructura y el estado de implementación.
2. Localiza y lee todos los `design.md` y documentos relevantes.
3. Identifica qué ya funciona, qué está incompleto, qué está duplicado y qué puede romperse.
4. Compara el estado actual con `MVP_UNIFOOD.md`.
5. Revisa especialmente autenticación Google, configuración Expo, cliente Supabase, esquema/migraciones, RLS, permisos por cafetería, pedidos, estados, manejo de errores y pruebas.
6. Entrega un plan por fases, en orden de dependencias, con:
   - objetivo de cada fase;
   - archivos existentes que modificarías y archivos nuevos que crearías;
   - migraciones SQL necesarias;
   - pruebas y criterios de aceptación;
   - riesgos y decisiones pendientes;
   - comandos que se pueden ejecutar en este repositorio.
7. Señala contradicciones entre documentos de diseño, código y reglas de negocio. No inventes decisiones de producto.
8. Recomienda la primera tarea de implementación que tenga el menor riesgo y desbloquee más trabajo.

Al final, espera mi aprobación antes de modificar archivos.

## Reglas permanentes para todas las siguientes tareas

### Arquitectura y calidad
- Inspecciona el código existente antes de cambiarlo. No reconstruyas el proyecto desde cero si ya existe una base útil.
- Usa TypeScript estricto y tipos explícitos. Evita `any`, duplicación y lógica de negocio dentro de componentes visuales.
- Respeta las convenciones y dependencias actuales. No cambies versiones principales ni instales librerías sin necesidad justificada.
- Separa UI, hooks, servicios, validaciones, tipos y lógica de dominio de manera proporcional al tamaño del MVP; no sobrearquitectes.
- No hagas refactors masivos ni modifiques archivos no relacionados con la tarea.
- Mantén la UI consistente con los `design.md`: colores, tipografía, espaciado, componentes, navegación y comportamiento. No reemplaces diseños aprobados por preferencias propias.
- La aplicación debe manejar estados de carga, vacío, error, éxito, desconexión y sesión expirada.
- No uses datos mock como si fueran datos reales. Si hay mocks de desarrollo, mantenlos claramente separados.

### Seguridad y Supabase
- RLS activado y probado en todas las tablas expuestas.
- Nunca expongas `service_role`, secretos ni credenciales privadas en el cliente o Git.
- No confíes en roles, totales, precios, IDs de cafetería, estados ni permisos enviados por el cliente.
- Un estudiante solo consulta sus pedidos; personal solo consulta pedidos de sus cafeterías; un usuario normal nunca puede elevarse a superadmin.
- Las políticas deben denegar por defecto. Añade pruebas negativas de acceso cruzado.
- Genera migraciones SQL versionadas en la estructura existente (por ejemplo `supabase/migrations`) y asegúrate de que reconstruyan el esquema desde cero.
- Las funciones privilegiadas deben validar identidad, autorización, parámetros y transiciones; si usan `SECURITY DEFINER`, fijar `search_path` y limitar `EXECUTE`.
- No hagas que la interfaz sea la única barrera de seguridad.
- Nunca guardes datos de tarjeta. En el MVP no se cobra electrónicamente.
- No afirmes que una operación se guardó si el servidor devolvió error.

### Reglas de pedidos no negociables
- Un pedido contiene productos de una sola cafetería.
- El servidor vuelve a consultar precio, disponibilidad y pertenencia de cada producto.
- El total se calcula en servidor con `numeric`/decimal, no con `float` del cliente.
- Los artículos del pedido guardan snapshot de nombre y precio para conservar el historial.
- La creación del pedido y sus artículos debe ser transaccional.
- Evita pedidos duplicados por doble toque o reintentos mediante idempotencia o mecanismo equivalente.
- Solo se permiten transiciones de estado válidas; cada transición queda en historial con actor y fecha.
- Los estados terminales no se reabren desde el flujo normal.
- Los productos desactivados no pueden pedirse, pero los pedidos históricos no cambian.
- Realtime nunca sustituye la autorización de base de datos.
- Distingue importe de pedidos de pagos realmente cobrados.

### Google Auth
- Usa Supabase Auth y el flujo compatible con la versión instalada de Expo.
- Documenta redirect URLs, scheme, configuración de Google Cloud y diferencias entre Expo Go y development build si aplican.
- El registro público crea un estudiante normal.
- No inventes IDs ni secretos OAuth. Usa `.env.example` con nombres de variables y valores de ejemplo no sensibles.
- Maneja cancelación, errores de red, restauración de sesión y cierre de sesión.

### Proceso de trabajo por tarea
Para cada tarea aprobada:
1. Resume el objetivo y los criterios de aceptación.
2. Inspecciona los archivos afectados y sus dependencias.
3. Propón una lista breve de archivos a crear/modificar.
4. Implementa únicamente el alcance aprobado.
5. Ejecuta las pruebas, lint y typecheck disponibles.
6. Corrige errores introducidos por tus cambios.
7. Revisa seguridad y regresiones.
8. Actualiza documentación si corresponde.
9. Resume qué cambió, qué comandos ejecutaste y su resultado real, qué queda pendiente y cómo probarlo manualmente.

No digas “todo funciona” si no lo comprobaste. Distingue claramente entre probado, implementado pero no probado y bloqueado por credenciales externas.

## Fases objetivo
1. Auditoría y plan.
2. Fundamentos: Expo/TypeScript, configuración, cliente Supabase, navegación/tema, migraciones y RLS base.
3. Google Auth y perfil con rol seguro.
4. Universidades, campus, cafeterías, categorías y menú.
5. Carrito de una cafetería y creación segura de pedidos.
6. Historial y detalle para estudiantes.
7. Cola operativa de cafetería y transiciones de estado.
8. Realtime con autorización.
9. Superadmin, asignación de personal y estado comercial.
10. Reportes básicos, accesibilidad, pruebas y preparación de piloto.

No avances automáticamente a la siguiente fase. Termina la tarea actual, reporta resultados y espera mi instrucción.

## Formato de tu primera respuesta
Entrega:
1. **Resumen del estado actual** del repositorio.
2. **Documentos de diseño encontrados** y reglas relevantes.
3. **Brechas y riesgos principales**, priorizados como críticos/altos/medios.
4. **Plan de fases** con dependencias y criterios de aceptación.
5. **Primera tarea recomendada** con archivos concretos.
6. **Preguntas bloqueantes**, solo si realmente impiden tomar una decisión segura.

Recuerda: en esta primera ejecución no modifiques archivos. Primero audita y espera aprobación.
