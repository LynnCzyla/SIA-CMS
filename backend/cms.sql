-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 12:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `short_title` text DEFAULT NULL,
  `full_title` text DEFAULT NULL,
  `topic_tags` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `short_title`, `full_title`, `topic_tags`, `description`, `image`, `status`, `scheduled_at`, `created_at`, `updated_at`, `author`, `slug`) VALUES
('2bc0948c-b990-11f0-b748-c018509200f9', 'jfjhwbjfe', 'jbwjbw', 'jbjhbe', '<p>jfbjebfjwefjhfe</p>', '1762268913014-777763467.webp', 'published', NULL, '2025-11-04 23:08:33', '2025-11-10 13:41:07', 12, 'Kuromi'),
('5649a7dc-b997-11f0-b748-c018509200f9', 'jfjhweb', 'jbwejfeb', 'jbjeh', '<p>bfhebfewf</p>', '1762271990847-429750890.webp', 'published', NULL, '2025-11-04 23:59:50', '2025-11-04 23:59:50', 12, NULL),
('a7bd5fcb-b98f-11f0-b748-c018509200f9', 'jndje', 'jhbfjqehbf', 'jbfjbef', '<p>jfjhefwe</p>', '1762268691532-524275736.webp', 'published', NULL, '2025-11-04 23:04:51', '2025-11-04 23:04:51', 1, NULL),
('bcd7af8b-c943-11f0-b8ab-c018509202f6', 'Jame', 'x', 'j', '<p>xx	</p>', '1763995321666-206657281.png', 'published', NULL, '2025-11-24 22:42:01', '2025-11-24 22:42:01', 12, 'jame'),
('d361c0ac-b99e-11f0-b748-c018509200f9', 'dbqjhbdj', 'jhbejfbj', 'jbjhbw', '<p>jfbejhwef</p>', '1762275207204-65518573.webp', 'published', NULL, '2025-11-05 00:53:27', '2025-11-05 00:53:27', 12, NULL),
('f7c6d85e-b98e-11f0-b748-c018509200f9', 'jndjedj', 'bfjwe', 'jbfjhwe', '<p>enfjnefef</p>', '1762268396313-221346.webp', 'published', NULL, '2025-11-04 22:59:56', '2025-11-04 22:59:56', 1, NULL),
('fe077a52-bdf7-11f0-9b30-c018509202f6', NULL, 'Welcome to the Lorem Ipsum MediSync', 'Welcome, Hello, Goodluck', '<p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.</span></p><p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Mauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.</span></p><p><br></p>', '1762753326480-6937911.jpg', 'published', NULL, '2025-11-10 13:42:06', '2025-11-24 22:09:55', 12, 'welcome-to-medisync');

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(11) NOT NULL,
  `contact_us` text DEFAULT NULL,
  `contact_info` text DEFAULT NULL,
  `hospital_address` text DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `mobile_numbers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`mobile_numbers`)),
  `email` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`id`, `contact_us`, `contact_info`, `hospital_address`, `telephone`, `mobile_numbers`, `email`, `updated_at`) VALUES
(1, 'Get in Touch', 'We value your feedback and are happy to assist you with inquiries about our hospital services.', '123 Health Avenue, Kapasigan, Pasig City, Philippines', 'Tel: (+632) 123-4567', '{\"admitting\": \"+63 900-111-2222\", \"sales\": \"+63 900-333-4444\", \"emergency\": \"+63 900-555-6666\", \"outpatient\": \"+63 900-777-8888\", \"radiology\": \"+63 900-999-0000\"}', 'info@yourhospital.com', '2025-11-25 11:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `events_careers`
--

CREATE TABLE `events_careers` (
  `id` int(11) NOT NULL,
  `post_type` enum('event','career') NOT NULL DEFAULT 'event',
  `short_title` varchar(255) NOT NULL,
  `full_title` varchar(500) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('draft','posted','trash') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_careers`
--

INSERT INTO `events_careers` (`id`, `post_type`, `short_title`, `full_title`, `tags`, `description`, `status`, `created_at`, `updated_at`, `image`, `author`) VALUES
(1, 'event', 'jehfbjwh', 'jbfjhwe', 'jbfjhwe', '<p>fbwjefhbjwhfebjhwfe</p>', 'posted', '2025-11-03 17:57:43', '2025-11-03 17:57:43', NULL, NULL),
(2, 'career', 'kjndjqwn', 'jejfjbe', 'jwbfjwhbe', '<p>fjbejhbffe</p>', 'draft', '2025-11-03 17:58:08', '2025-11-03 17:58:08', NULL, NULL),
(3, 'event', 'jnjnjewf', 'hfbjwfe', 'jbfwje', '<p>fjwehjef</p>', 'posted', '2025-11-03 18:04:30', '2025-11-03 18:04:30', NULL, NULL),
(4, 'career', 'kemekemeke e', 'kemekemekeka', 'kemekeekeme', '<p>jdenjwdhjeb</p>', 'posted', '2025-11-04 14:47:35', '2025-11-04 14:47:35', '1762267655492.gif', NULL),
(5, 'event', 'jebfjhbe', 'kjwwjbfq', 'kjbjbdqw', '<p>jbfjhwef</p>', 'posted', '2025-11-04 15:23:12', '2025-11-04 15:23:12', '1762269792847.webp', 12);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `date_uploaded` timestamp NOT NULL DEFAULT current_timestamp(),
  `section` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `filename`, `url`, `size`, `status`, `date_uploaded`, `section`) VALUES
(23, 'Doctors', 'istockphoto-1555515663-612x612jpg-1763779971240.jpg', '/uploads/media/istockphoto-1555515663-612x612jpg-1763779971240.jpg', NULL, 'Active', '2025-11-21 18:52:51', 'home-carousel');

-- --------------------------------------------------------

--
-- Table structure for table `health_tips`
--

CREATE TABLE `health_tips` (
  `id` char(36) NOT NULL,
  `short_title` varchar(255) NOT NULL,
  `full_title` varchar(255) NOT NULL,
  `topic_tags` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_tips`
--

INSERT INTO `health_tips` (`id`, `short_title`, `full_title`, `topic_tags`, `description`, `status`, `image`, `slug`, `author`, `scheduled_at`, `created_at`, `updated_at`) VALUES
('', 'James', 'James', 'james', '<p>James</p>', 'published', '1763994793359-535401115.png', NULL, '12', NULL, '2025-11-24 22:33:13', '2025-11-24 22:33:13');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `post_type` enum('event','career') NOT NULL DEFAULT 'career',
  `job_title` varchar(255) NOT NULL,
  `short_title` varchar(255) DEFAULT NULL,
  `full_title` varchar(500) NOT NULL,
  `department` varchar(255) NOT NULL,
  `job_type` enum('Full-time','Part-time','Contract') NOT NULL DEFAULT 'Full-time',
  `location` varchar(255) NOT NULL,
  `qualifications` varchar(500) NOT NULL,
  `application_deadline` date NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('draft','posted','trash') NOT NULL DEFAULT 'draft',
  `image` varchar(255) DEFAULT NULL,
  `author` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `post_type`, `job_title`, `short_title`, `full_title`, `department`, `job_type`, `location`, `qualifications`, `application_deadline`, `tags`, `description`, `status`, `image`, `author`, `created_at`, `updated_at`) VALUES
(1, 'career', 'aaaa', NULL, '', 'Administration', 'Part-time', 'aaa', 'aaaaa', '2025-11-28', NULL, '<p>aaaaa</p>', 'trash', '1762687515597.jpg', 26, '2025-11-09 11:25:15', '2025-11-10 04:28:07'),
(2, 'career', 'Nursing Intern', NULL, '', 'Nursing', 'Full-time', 'Quezon City', 'BSNursing Graduate', '2025-11-27', NULL, '<p class=\"ql-align-justify\">We are <span style=\"background-color: rgb(255, 255, 255); color: inherit;\">is looking to hire an experienced and highly dynamic </span><strong style=\"background-color: rgb(255, 255, 255); color: inherit;\">Corporate Legal Counsel</strong><span style=\"background-color: rgb(255, 255, 255); color: inherit;\"> who oversees the legal aspects of the business and ensures that the hospital operates within the law at all times.  S/He creates an effective guardian of the organization and facilitates business strategies development.  S/He serves as a resource person to senior management and physicians; offers counsel on legal issues, guarantees legal compliance in the institution and limits risk exposure. Additionally, s/he aligns and improves the culture of the Corporate Affairs Division’s services and organizes its structure to support the hospital’s core purpose. </span></p><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Job Duties &amp; Responsibilities</span></p><ol><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provides expert and strategic legal advice to management </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Anticipates issues and estimate risks strategically  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Sets internal governance policies and manage the impact of external factors. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Keeps abreast of legislative changes. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Communicate and negotiate with external parties (regulators, external counsel, politicians, clients). </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Collaborate with management to devise efficient defense strategies. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Liaise with relevant departments to ensure that where legal risks have been identified, appropriate courses of action have been taken </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provide legal protection and risk management advice to management. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review ongoing cases and advice management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review and advise management on legal implications of internal policies and procedures. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review progress of outstanding litigation and liaise with and manage external lawyers. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Continuously monitor compliance with statutory obligations and advise management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Prepare monthly and quarterly reports for the department for executive management meetings. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Responsible for the review and streamlining of processes and policies to continuously improve the quality of service in the department.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Leads or directs the team or creates functional team to identify performance gaps and formulate strategic interventions to continuously improve on identified areas for improvement, when required </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Participates in the planning and implementation of performance management program and in communicating this with different department leaders. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Monitors the compliance of employee movement and regularization through collaboration with other HR leaders; ensures that all rewards related to employee movement and regularization are communicated and implemented by the respective department/section/ unit leader.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Mentors and/or trains the junior leaders to ensure proper cascading and/or learning of technical know-how and soft skills that contribute to the achievement organization’s strategic objectives.  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li></ol><p><br></p>', 'trash', '1762748397865.jpg', 12, '2025-11-10 04:19:57', '2025-11-10 04:27:59'),
(3, 'career', 'Nursing Intern', 'We are Looking for Nursing Intern', '', 'Nursing', 'Full-time', 'Pasig CIty', 'BSNursing Graduate', '2025-11-19', NULL, '<p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">is looking to hire an experienced and highly dynamic </span><strong style=\"background-color: rgb(255, 255, 255); color: inherit;\">Corporate Legal Counsel</strong><span style=\"background-color: rgb(255, 255, 255); color: inherit;\"> who oversees the legal aspects of the business and ensures that the hospital operates within the law at all times.  S/He creates an effective guardian of the organization and facilitates business strategies development.  S/He serves as a resource person to senior management and physicians; offers counsel on legal issues, guarantees legal compliance in the institution and limits risk exposure. Additionally, s/he aligns and improves the culture of the Corporate Affairs Division’s services and organizes its structure to support the hospital’s core purpose. </span></p><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Job Duties &amp; Responsibilities</span></p><ol><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provides expert and strategic legal advice to management </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Anticipates issues and estimate risks strategically  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Sets internal governance policies and manage the impact of external factors. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Keeps abreast of legislative changes. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Communicate and negotiate with external parties (regulators, external counsel, politicians, clients). </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Collaborate with management to devise efficient defense strategies. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Liaise with relevant departments to ensure that where legal risks have been identified, appropriate courses of action have been taken </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provide legal protection and risk management advice to management. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review ongoing cases and advice management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review and advise management on legal implications of internal policies and procedures. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review progress of outstanding litigation and liaise with and manage external lawyers. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Continuously monitor compliance with statutory obligations and advise management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Prepare monthly and quarterly reports for the department for executive management meetings. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Responsible for the review and streamlining of processes and policies to continuously improve the quality of service in the department.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Leads or directs the team or creates functional team to identify performance gaps and formulate strategic interventions to continuously improve on identified areas for improvement, when required </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Participates in the planning and implementation of performance management program and in communicating this with different department leaders. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Monitors the compliance of employee movement and regularization through collaboration with other HR leaders; ensures that all rewards related to employee movement and regularization are communicated and implemented by the respective department/section/ unit leader.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Mentors and/or trains the junior leaders to ensure proper cascading and/or learning of technical know-how and soft skills that contribute to the achievement organization’s strategic objectives.  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li></ol><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Qualifications</span></p><h2 class=\"ql-align-center\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 148, 68);\">Apply for this position</span></h2><p><br></p>', 'posted', '1762750852806.jpg', 12, '2025-11-10 05:00:52', '2025-11-10 05:00:52');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `short_title` text DEFAULT NULL,
  `full_title` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `topic_tags` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `image` varchar(255) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `short_title`, `full_title`, `slug`, `topic_tags`, `description`, `status`, `image`, `scheduled_at`, `created_at`, `updated_at`, `author`) VALUES
('1bbf2721-b99b-11f0-b748-c018509200f9', 'mn fwbje ', 'jjebfj', NULL, 'jbjhebf', '<p>jfbjhbfwe</p>', 'draft', NULL, NULL, '2025-11-05 00:26:50', '2025-11-05 00:26:50', 12),
('1f254804-b996-11f0-b748-c018509200f9', 'hjbjheb', 'jbfjbjweb', NULL, 'jbefjbwe', '<p>jbfjwhfebwef</p>', 'posted', '00de2686-c72b-4515-bb46-1b1d1bd3adef.webp', NULL, '2025-11-04 23:51:08', '2025-11-04 23:51:08', 12),
('3457a777-b996-11f0-b748-c018509200f9', 'dvfhwvefh', 'kbfjebj', NULL, 'jbfjwbe', '<p>bdjhjbdqw</p>', 'draft', NULL, NULL, '2025-11-04 23:51:44', '2025-11-04 23:51:44', 12),
('5e3c2a48-b997-11f0-b748-c018509200f9', 'jbfjwbfj', 'jhbfjbej', NULL, 'jhhbjefhb', '<p>wbdhwbdjwd</p>', 'posted', NULL, NULL, '2025-11-05 00:00:04', '2025-11-05 00:00:04', 12),
('60822222-b995-11f0-b748-c018509200f9', 'bfjhewfj', 'jhbfejwe', NULL, 'jbfjhwe', '<p>jfbjwvef</p>', 'posted', '03be2231-bd50-4c12-96d6-19a245f3904f.webp', NULL, '2025-11-04 23:45:49', '2025-11-04 23:45:49', 12),
('99ef8bc9-b9ae-11f0-b748-c018509200f9', 'wnmqdbqjw', 'jhbjfb', NULL, 'jhbjf', '<p>fejwejhbwfe</p>', 'posted', NULL, NULL, '2025-11-05 02:46:22', '2025-11-05 02:46:22', 12),
('a07b21c5-b996-11f0-b748-c018509200f9', 'mbfjwhebf', 'kjjfbwjeb', NULL, 'kjbjbfe', '<p>jbfjhwef</p>', 'posted', 'd1fb21d9-8525-4cf7-8ac6-8ef1dee824ef.gif', NULL, '2025-11-04 23:54:45', '2025-11-04 23:54:45', 12),
('ab8baeeb-c941-11f0-b8ab-c018509202f6', 'Jamesss', 'ameee', 'jamesss', 'aaa', '<p>aaaaa</p>', 'posted', '1763994433626-631069622.png', NULL, '2025-11-24 22:27:13', '2025-11-24 22:27:13', 12),
('b332d70a-b995-11f0-b748-c018509200f9', 'bfjhewfj', 'jhbfejwe', NULL, 'jbfjhwe', '<p>jfbjwvef</p>', 'posted', 'd28dffe7-3b06-4adc-bbc1-7ba3aa1e3e49.webp', NULL, '2025-11-04 23:48:07', '2025-11-04 23:48:07', 12),
('c38afae1-b996-11f0-b748-c018509200f9', 'kjfbjhebj', 'kjbjefbwefb', NULL, 'kjbqbf', '<p>jfbjwfeb</p>', 'posted', 'c9853452-a0db-45d1-97e3-60b4240ecd74.webp', NULL, '2025-11-04 23:55:44', '2025-11-04 23:55:44', 12),
('dae6dc1f-b99e-11f0-b748-c018509200f9', 'fmwbejb', 'kjnjwfe', NULL, 'jbfjhbe', '<p>fbwjehbfwe</p>', 'trash', NULL, NULL, '2025-11-05 00:53:39', '2025-11-05 01:44:23', 12),
('daf314a0-c943-11f0-b8ab-c018509202f6', 'aaaaa', 'aaaa', 'aaaaa', 'aaa', '<p>aaaa</p>', 'posted', '1763995372179-711433668.png', NULL, '2025-11-24 22:42:52', '2025-11-24 22:42:52', 12),
('e0b4921a-b996-11f0-b748-c018509200f9', 'd qjbdjw', 'kjbjbfej', NULL, 'jbjfehw', '<p><br></p>', 'posted', NULL, NULL, '2025-11-04 23:56:33', '2025-11-04 23:56:33', 12),
('eb30e588-b996-11f0-b748-c018509200f9', 'ebfjbwe', 'kbjfehb', NULL, 'jbfjhwe', '<p>jbfjhew</p>', 'draft', NULL, NULL, '2025-11-04 23:56:51', '2025-11-04 23:56:51', 12);

-- --------------------------------------------------------

--
-- Table structure for table `page_views`
--

CREATE TABLE `page_views` (
  `page_name` varchar(255) NOT NULL,
  `view_date` date NOT NULL DEFAULT curdate(),
  `visit_count` decimal(32,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page_views`
--

INSERT INTO `page_views` (`page_name`, `view_date`, `visit_count`) VALUES
('/', '2025-11-17', 19),
('/', '2025-11-22', 3),
('/', '2025-11-25', 3),
('/about', '2025-11-22', 4),
('/announcements', '2025-11-22', 5),
('/announcements', '2025-11-24', 26),
('/announcements', '2025-11-25', 1),
('/announcements/jame', '2025-11-24', 5),
('/announcements/jame', '2025-11-25', 1),
('/announcements/null', '2025-11-24', 1),
('/announcements/welcome-to-medisync', '2025-11-24', 6),
('/careers', '2025-11-22', 5),
('/contact', '2025-11-22', 3),
('/contact', '2025-11-25', 1),
('/doctors', '2025-11-17', 7),
('/doctors', '2025-11-22', 3),
('/health', '2025-11-22', 4),
('/health', '2025-11-24', 2),
('/health', '2025-11-25', 2),
('/health/null', '2025-11-24', 10),
('/health/null', '2025-11-25', 1),
('/news', '2025-11-22', 3),
('/news', '2025-11-24', 10),
('/news/aaaaa', '2025-11-24', 2),
('/news/jamesss', '2025-11-24', 9),
('/news/null', '2025-11-24', 6),
('/news/undefined', '2025-11-25', 2),
('/services', '2025-11-17', 12),
('/services', '2025-11-22', 9);

-- --------------------------------------------------------

--
-- Table structure for table `page_views_backup`
--

CREATE TABLE `page_views_backup` (
  `page_name` varchar(255) NOT NULL,
  `visit_count` int(11) DEFAULT 1,
  `view_date` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page_views_backup`
--

INSERT INTO `page_views_backup` (`page_name`, `visit_count`, `view_date`) VALUES
('/', 19, '2025-11-17'),
('/about', 4, '2025-11-22'),
('/announcements', 5, '2025-11-22'),
('/careers', 5, '2025-11-22'),
('/contact', 3, '2025-11-22'),
('/doctors', 7, '2025-11-17'),
('/health', 4, '2025-11-22'),
('/news', 3, '2025-11-22'),
('/services', 12, '2025-11-17');

-- --------------------------------------------------------

--
-- Table structure for table `post_logs`
--

CREATE TABLE `post_logs` (
  `id` int(11) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `message` text DEFAULT NULL,
  `editor` varchar(255) DEFAULT 'system',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_logs`
--

INSERT INTO `post_logs` (`id`, `post_id`, `category`, `action`, `message`, `editor`, `created_at`) VALUES
(1, 'fe077a52-bdf7-11f0-9b30-c018509202f6', 'Announcements', 'edit', 'Post updated', 'James', '2025-11-24 14:09:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `reset_code` varchar(100) DEFAULT NULL,
  `code_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`, `role`, `last_login`, `reset_code`, `code_expiry`) VALUES
(8, 'Lynn', 'lynnzylameczdo@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-17 21:31:06', 'hr_administrator', '2025-11-08 02:03:38', '514594', '2025-10-25 10:41:31'),
(11, 'Lynn Czyla Alpuerto', 'alpuerto_lynnczyla@plpasig.edu.ph', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:32:20', 'content_administrator', NULL, NULL, NULL),
(12, 'James', 'flavierlaurence01@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:40:35', 'super_administrator', '2025-11-25 18:59:07', NULL, NULL),
(26, 'Laurence HR', 'dumpblj@gmail.com', '$2b$10$Kx3YJuI3AzNiqMq/88FSUuuowi7bRwEJGU3AnyTzoEVT8QFwZ6VrK', '2025-11-09 11:04:50', 'hr_administrator', '2025-11-09 19:23:47', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events_careers`
--
ALTER TABLE `events_careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_tips`
--
ALTER TABLE `health_tips`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `page_views`
--
ALTER TABLE `page_views`
  ADD UNIQUE KEY `unique_page_date` (`page_name`,`view_date`);

--
-- Indexes for table `post_logs`
--
ALTER TABLE `post_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_logs_created_at` (`created_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events_careers`
--
ALTER TABLE `events_careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `post_logs`
--
ALTER TABLE `post_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
