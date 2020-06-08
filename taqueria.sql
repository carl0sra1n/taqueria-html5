-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2020 a las 13:16:20
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taqueria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `usuario` text DEFAULT NULL,
  `nombre` text DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `correo` text DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `usuario`, `nombre`, `direccion`, `telefono`, `correo`, `password`) VALUES
(1, 'Carlos123', 'Carlos C. Anguiano', 'Villas del Rio', 6672684518, 'carlos.anguiano11@gmail.com', 'pa7VjtvTI6Meg'),
(5, 'Prueba', 'Prueba1 Prueba2', 'Prueba #123, Col. Prueba', 6672684518, 'prueba@prueba.com', 'paJv.nuS0qRH2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `precio` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `nombre`, `imagen`, `precio`) VALUES
(1, 'Taco de asada', 'assets/img/menu/taco_asada.jpg', 8),
(2, 'Taco de tripa', 'assets/img/menu/taco_tripa.jpg', 10),
(3, 'Taco de lengua', 'assets/img/menu/taco_lengua.jpg', 10),
(4, 'Taco de camarón', 'assets/img/menu/taco_camaron.jpg', 15),
(5, 'Taco de cabeza', 'assets/img/menu/taco_cabeza.jpg', 10),
(6, 'Taco al pastor', 'assets/img/menu/taco_pastor.jpg', 11),
(7, 'Taco de canasta', 'assets/img/menu/taco_canasta.jpg', 8),
(8, 'Taco de carnitas', 'assets/img/menu/taco_carnitas.jpg', 12),
(9, 'Taco de chicha...', 'assets/img/menu/taco_chicharron.jpg', 13),
(10, 'Taco de pescado', 'assets/img/menu/taco_pescado.jpg', 14),
(11, 'Taco de cochinita', 'assets/img/menu/taco_cochinita.jpg', 12),
(12, 'Taco de suadero', 'assets/img/menu/taco_suadero.jpg', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pedido` text DEFAULT NULL,
  `fecha` text DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_pedido`, `fecha`, `id_cliente`, `id_producto`, `cantidad`) VALUES
(1, 'P1096', '2020-06-08 05:10:48', 1, 5, 2),
(2, 'P1096', '2020-06-08 05:10:48', 1, 6, 2),
(3, 'P1096', '2020-06-08 05:10:48', 1, 7, 2),
(4, 'P46885', '2020-06-08 05:12:39', 5, 1, 1),
(5, 'P46885', '2020-06-08 05:12:39', 5, 2, 3),
(6, 'P46885', '2020-06-08 05:12:39', 5, 3, 2),
(7, 'P46885', '2020-06-08 05:12:39', 5, 4, 2),
(8, 'P46885', '2020-06-08 05:12:39', 5, 8, 2),
(9, 'P46885', '2020-06-08 05:12:39', 5, 7, 2),
(10, 'P46885', '2020-06-08 05:12:39', 5, 6, 2),
(11, 'P46885', '2020-06-08 05:12:39', 5, 5, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `menu` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
