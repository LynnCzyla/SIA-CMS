-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2025 at 05:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `about_hospital`
--

CREATE TABLE `about_hospital` (
  `id` int(11) NOT NULL,
  `aboutHospital` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `vision` text DEFAULT NULL,
  `qualityPolicy` text DEFAULT NULL,
  `coreValues` text DEFAULT NULL,
  `ourHistory` text DEFAULT NULL,
  `privacyPolicy` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_hospital`
--

INSERT INTO `about_hospital` (`id`, `aboutHospital`, `mission`, `vision`, `qualityPolicy`, `coreValues`, `ourHistory`, `privacyPolicy`, `created_at`, `updated_at`) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu pellentesque diam. Maecenas lacinia aliquet imperdiet. Ut luctus pharetra sem, sit amet facilisis velit tincidunt nec. Phasellus eget eros neque. Etiam risus felis, lacinia sed rhoncus lobortis, sagittis sed ligula. Quisque ac orci est. Donec quis velit lacus. Aliquam in lacus odio. Aenean pulvinar semper dictum. Nullam gravida hendrerit velit ac mattis. Donec consectetur tellus risus, eu commodo mi ullamcorper non. Morbi in lobortis purus, sed interdum ex. Nulla sapien diam, sagittis non leo id, mattis tincidunt purus.\n\nMauris viverra tincidunt nisl vel dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse in libero tempus, interdum libero eget, lacinia velit. Vestibulum bibendum sem non scelerisque rutrum. Duis dignissim risus quis ex commodo posuere. Vestibulum sed elit eget lacus ornare ultricies at a tortor. Quisque dui risus, efficitur eu congue a, laoreet a ante.', '2025-11-27 08:19:02', '2025-11-27 08:19:02');

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
('3ae25719-cb63-11f0-9e6e-c0185091f4ff', 'Lorem Ipsum', 'Lorem Ipusm', 'Lorem Ipsum', '<p>Lorem Ipsum</p>', '1764228749833-182185891.jpg', 'published', NULL, '2025-11-27 15:32:29', '2025-11-27 15:32:29', 12, 'lorem-ipsum'),
('5649a7dc-b997-11f0-b748-c018509200f9', 'jfjhweb', 'jbwejfeb', 'jbjeh', '<p>bfhebfewf</p>', '1762271990847-429750890.webp', 'published', NULL, '2025-11-04 23:59:50', '2025-11-04 23:59:50', 12, NULL),
('a7bd5fcb-b98f-11f0-b748-c018509200f9', 'jndje', 'jhbfjqehbf', 'jbfjbef', '<p>jfjhefwe</p>', '1762268691532-524275736.webp', 'published', NULL, '2025-11-04 23:04:51', '2025-11-04 23:04:51', 1, NULL),
('bcd7af8b-c943-11f0-b8ab-c018509202f6', 'Jame', 'x', 'j', '<p>xx	</p>', '1763995321666-206657281.png', 'published', NULL, '2025-11-24 22:42:01', '2025-11-24 22:42:01', 12, 'jame'),
('d361c0ac-b99e-11f0-b748-c018509200f9', 'dbqjhbdj', 'jhbejfbj', 'jbjhbw', '<p>jfbejhwef</p>', '1762275207204-65518573.webp', 'published', NULL, '2025-11-05 00:53:27', '2025-11-05 00:53:27', 12, NULL),
('eddf2d4e-cc6a-11f0-88eb-c0185091f91d', 'aNNOUNCE,MENT', 'aNNOUNCE,MENT', 'aNNOUNCE,MENT', '<p>aNNOUNCE,MENTATGWQTGW</p>', '1764342007786-62377200.jpg', 'published', NULL, '2025-11-28 23:00:07', '2025-11-28 23:00:07', 12, 'announcement'),
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
(1, 'Get in Touch with me', 'We value your feedback and are happy to assist you with inquiries about our hospital services.', '123 Health Avenue, Kapasigan, Pasig City, Philippines', 'Tel: (+632) 123-4567 ', '{\"admitting\":\"+63 900-111-2222\",\"sales\":\"+63 900-333-4444\",\"emergency\":\"+63 900-555-6666\",\"outpatient\":\"+63 900-777-8888\",\"radiology\":\"+63 900-999-0000\"}', 'info@yourhospital.com', '2025-11-27 08:13:15');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_visibility`
--

CREATE TABLE `doctors_visibility` (
  `employee_id` int(11) NOT NULL,
  `is_shown` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ems_job_logs`
--

CREATE TABLE `ems_job_logs` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `action` varchar(50) NOT NULL COMMENT 'submitted, approve, reject',
  `ems_user_id` varchar(100) DEFAULT NULL,
  `cms_reviewer_id` bigint(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id` int(11) NOT NULL,
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
(1, 'wowwo', 'wowow', 'wowow', '<p>wowow</p>', 'published', '1764231110302-395518667.webp', 'wowwo', '12', NULL, '2025-11-27 16:11:50', '2025-11-27 16:11:50'),
(2, 'wiwiwwi', 'wiwiwi', 'wiwiw', '<p>wiwiwi</p>', 'published', '1764231124073-818807281.png', 'wiwiwwi', '12', NULL, '2025-11-27 16:12:04', '2025-11-27 16:12:04'),
(3, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru', 'Nutrition', '<p>Drink your water beach!!</p>', 'published', '1764341891865-680915894.jpg', 'lorem-ipsum-dolor-sit-amet', '12', NULL, '2025-11-28 22:58:11', '2025-11-28 22:58:11');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `short_title` varchar(255) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `job_type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `qualifications` varchar(500) NOT NULL,
  `application_deadline` date NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('draft','pending_approval','posted','publish','published','rejected','trash') NOT NULL DEFAULT 'draft',
  `image` varchar(255) DEFAULT NULL,
  `author` int(11) DEFAULT NULL,
  `submitted_by_ems` tinyint(1) DEFAULT 0,
  `ems_user_id` varchar(100) DEFAULT NULL,
  `ems_user_name` varchar(255) DEFAULT NULL,
  `ems_notes` text DEFAULT NULL COMMENT 'Notes from EMS to CMS admin',
  `urgency_level` enum('urgent','medium','low') DEFAULT 'medium' COMMENT 'Job posting urgency',
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `job_title`, `short_title`, `department`, `job_type`, `location`, `qualifications`, `application_deadline`, `tags`, `description`, `status`, `image`, `author`, `submitted_by_ems`, `ems_user_id`, `ems_user_name`, `ems_notes`, `urgency_level`, `reviewed_by`, `reviewed_at`, `rejection_reason`, `created_at`, `updated_at`) VALUES
(1, 'aaaa', NULL, 'Administration', 'Part-time', 'aaa', 'aaaaa', '2025-11-28', NULL, '<p>aaaaa</p>', 'trash', '1762687515597.jpg', 26, 0, NULL, NULL, NULL, 'medium', NULL, NULL, NULL, '2025-11-09 11:25:15', '2025-11-10 04:28:07'),
(2, 'Nursing Intern', NULL, 'Nursing', 'Full-time', 'Quezon City', 'BSNursing Graduate', '2025-11-27', NULL, '<p class=\"ql-align-justify\">We are <span style=\"background-color: rgb(255, 255, 255); color: inherit;\">is looking to hire an experienced and highly dynamic </span><strong style=\"background-color: rgb(255, 255, 255); color: inherit;\">Corporate Legal Counsel</strong><span style=\"background-color: rgb(255, 255, 255); color: inherit;\"> who oversees the legal aspects of the business and ensures that the hospital operates within the law at all times.  S/He creates an effective guardian of the organization and facilitates business strategies development.  S/He serves as a resource person to senior management and physicians; offers counsel on legal issues, guarantees legal compliance in the institution and limits risk exposure. Additionally, s/he aligns and improves the culture of the Corporate Affairs Division’s services and organizes its structure to support the hospital’s core purpose. </span></p><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Job Duties &amp; Responsibilities</span></p><ol><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provides expert and strategic legal advice to management </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Anticipates issues and estimate risks strategically  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Sets internal governance policies and manage the impact of external factors. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Keeps abreast of legislative changes. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Communicate and negotiate with external parties (regulators, external counsel, politicians, clients). </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Collaborate with management to devise efficient defense strategies. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Liaise with relevant departments to ensure that where legal risks have been identified, appropriate courses of action have been taken </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provide legal protection and risk management advice to management. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review ongoing cases and advice management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review and advise management on legal implications of internal policies and procedures. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review progress of outstanding litigation and liaise with and manage external lawyers. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Continuously monitor compliance with statutory obligations and advise management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Prepare monthly and quarterly reports for the department for executive management meetings. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Responsible for the review and streamlining of processes and policies to continuously improve the quality of service in the department.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Leads or directs the team or creates functional team to identify performance gaps and formulate strategic interventions to continuously improve on identified areas for improvement, when required </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Participates in the planning and implementation of performance management program and in communicating this with different department leaders. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Monitors the compliance of employee movement and regularization through collaboration with other HR leaders; ensures that all rewards related to employee movement and regularization are communicated and implemented by the respective department/section/ unit leader.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Mentors and/or trains the junior leaders to ensure proper cascading and/or learning of technical know-how and soft skills that contribute to the achievement organization’s strategic objectives.  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li></ol><p><br></p>', 'trash', '1762748397865.jpg', 12, 0, NULL, NULL, NULL, 'medium', NULL, NULL, NULL, '2025-11-10 04:19:57', '2025-11-10 04:27:59'),
(3, 'Nursing Intern', 'We are Looking for Nursing Intern', 'Nursing', 'Full-time', 'Pasig CIty', 'BSNursing Graduate', '2025-11-19', NULL, '<p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">is looking to hire an experienced and highly dynamic </span><strong style=\"background-color: rgb(255, 255, 255); color: inherit;\">Corporate Legal Counsel</strong><span style=\"background-color: rgb(255, 255, 255); color: inherit;\"> who oversees the legal aspects of the business and ensures that the hospital operates within the law at all times.  S/He creates an effective guardian of the organization and facilitates business strategies development.  S/He serves as a resource person to senior management and physicians; offers counsel on legal issues, guarantees legal compliance in the institution and limits risk exposure. Additionally, s/he aligns and improves the culture of the Corporate Affairs Division’s services and organizes its structure to support the hospital’s core purpose. </span></p><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Job Duties &amp; Responsibilities</span></p><ol><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provides expert and strategic legal advice to management </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Anticipates issues and estimate risks strategically  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Sets internal governance policies and manage the impact of external factors. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Keeps abreast of legislative changes. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Communicate and negotiate with external parties (regulators, external counsel, politicians, clients). </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Collaborate with management to devise efficient defense strategies. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Liaise with relevant departments to ensure that where legal risks have been identified, appropriate courses of action have been taken </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Provide legal protection and risk management advice to management. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review ongoing cases and advice management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review and advise management on legal implications of internal policies and procedures. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Review progress of outstanding litigation and liaise with and manage external lawyers. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Continuously monitor compliance with statutory obligations and advise management accordingly. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Prepare monthly and quarterly reports for the department for executive management meetings. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Responsible for the review and streamlining of processes and policies to continuously improve the quality of service in the department.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Leads or directs the team or creates functional team to identify performance gaps and formulate strategic interventions to continuously improve on identified areas for improvement, when required </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Participates in the planning and implementation of performance management program and in communicating this with different department leaders. </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Monitors the compliance of employee movement and regularization through collaboration with other HR leaders; ensures that all rewards related to employee movement and regularization are communicated and implemented by the respective department/section/ unit leader.   </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Mentors and/or trains the junior leaders to ensure proper cascading and/or learning of technical know-how and soft skills that contribute to the achievement organization’s strategic objectives.  </span></li><li data-list=\"bullet\" class=\"ql-align-justify\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: inherit;\">Oversees the development and placement of safety strategies and continuous quality improvement of service initiatives in the department. </span></li></ol><p><span style=\"background-color: rgb(248, 250, 252); color: rgb(31, 33, 36);\">Qualifications</span></p><h2 class=\"ql-align-center\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 148, 68);\">Apply for this position</span></h2><p><br></p>', 'posted', '1762750852806.jpg', 12, 0, NULL, NULL, NULL, 'medium', NULL, NULL, NULL, '2025-11-10 05:00:52', '2025-11-10 05:00:52'),
(4, 'xdfhg', '', 'Administration', '', '', '', '0000-00-00', NULL, '<p><br></p>', 'posted', NULL, 12, 0, NULL, NULL, NULL, 'medium', NULL, NULL, NULL, '2025-11-30 12:25:41', '2025-11-30 12:25:41'),
(5, 'Senior Staff Nurse - Emergency Department', 'We are looking for Senior Staff Nurse RN', 'Nursing', '', 'Pasig', 'Bachelor of Science in Nursing (BSN) degree, Minimum 3 years of experience in Emergency Department nursing', '2025-12-01', NULL, '<p><em>📍 POSITION: Senior Staff Nurse - Emergency Department</em></p><p><em>🏥 DEPARTMENT: Emergency Medicine</em></p><p><em>📌 EMPLOYMENT TYPE: Full-time Regular</em></p><p><em>📍 LOCATION: Main Hospital, Pasig</em></p><p><em>👥 VACANCIES: 3 Positions</em></p><p><em>📅 APPLICATION DEADLINE: January 30, 2024</em></p><p><br></p><p><br></p><h2>🎯 JOB SUMMARY</h2><p><br></p><p>General Hospital is seeking experienced and compassionate Senior Staff Nurses to join our expanding Emergency Department team. The ideal candidate will provide high-quality emergency care, mentor junior staff, and contribute to our mission of delivering exceptional patient-centered care in critical situations.</p><p><br></p><p><br></p><h2>📋 KEY RESPONSIBILITIES</h2><p><br></p><p>• Triage and assess patients arriving in the Emergency Department</p><p>• Provide immediate nursing care to critically ill or injured patients</p><p>• Administer medications, treatments, and emergency procedures as ordered</p><p>• Monitor patient conditions and vital signs continuously</p><p>• Collaborate with emergency physicians and healthcare team members</p><p>• Mentor and guide junior nursing staff and new graduates</p><p>• Maintain accurate and timely electronic health records</p><p>• Ensure compliance with hospital protocols and safety standards</p><p>• Participate in emergency drills and continuous training programs</p><p>• Provide emotional support and clear communication to patients and families</p><p><br></p><h2><br></h2><h2>🎓 QUALIFICATIONS &amp; REQUIREMENTS</h2><p><br></p><p><strong>Education:</strong></p><p>• Bachelor of Science in Nursing (BSN) degree</p><p>• Master\'s degree in Nursing or related field (preferred but not required)</p><p><br></p><p><strong>Licenses &amp; Certifications:</strong></p><p>• Active PRC Professional Nursing License</p><p>• Basic Life Support (BLS) certification</p><p>• Advanced Cardiac Life Support (ACLS) certification</p><p>• Pediatric Advanced Life Support (PALS) certification</p><p>• Emergency Nursing Training certification (preferred)</p><p><br></p><p><strong>Experience:</strong></p><p>• Minimum 3 years of experience in Emergency Department nursing</p><p>• At least 1 year in a senior or charge nurse role</p><p>• Experience in trauma care and critical emergency situations</p><p><br></p><p><strong>Skills &amp; Competencies:</strong></p><p>• Excellent clinical assessment and decision-making skills</p><p>• Strong leadership and team management abilities</p><p>• Effective communication and interpersonal skills</p><p>• Ability to work under pressure in fast-paced environments</p><p>• Proficiency in electronic health record systems</p><p>• Fluency in English and Filipino</p><p><br></p><p><br></p><h2>💼 WHAT WE OFFER</h2><p><br></p><p><strong>Compensation &amp; Benefits:</strong></p><p>• Competitive salary package with hazard pay</p><p>• Government-mandated benefits (SSS, PhilHealth, Pag-IBIG)</p><p>• Comprehensive HMO coverage for employee and dependents</p><p>• Retirement plan benefits</p><p>• Annual salary increase and performance bonus</p><p><br></p><p><strong>Professional Development:</strong></p><p>• Continuous training and skills enhancement programs</p><p>• Opportunities for career advancement</p><p>• Conference and seminar allowances</p><p>• Tuition fee assistance for further studies</p><p><br></p><p><strong>Work Environment:</strong></p><p>• State-of-the-art emergency facilities and equipment</p><p>• Supportive and collaborative team environment</p><p>• Regular work schedule with rotating shifts</p><p>• Modern employee facilities and amenities</p><p><br></p><p><br></p><h2>📞 HOW TO APPLY</h2><p><br></p><p>Interested and qualified applicants may submit the following documents:</p><p><br></p><p>1. Updated Resume with recent 2x2 photo</p><p>2. PRC Board Rating and License</p><p>3. Transcript of Records</p><p>4. Certificates of Employment</p><p>5. Training and Seminar Certificates</p><p>6. Other relevant credentials</p><p><br></p><p><strong>Application Methods:</strong></p><p>• Online: careers.generalhospital.ph/senior-nurse-ed</p><p>• Email: hr.recruitment@generalhospital.ph</p><p>• In-person: HR Department, 3rd Floor, Main Building</p><p><br></p><p><strong>For inquiries, please contact:</strong></p><p>Human Resources Department</p><p>📞 (02) 8123-4567 local 245</p><p>📱 0917-123-4567</p><p>🕘 Monday to Friday, 8:00 AM - 5:00 PM</p><p><br></p><p><br></p><h2>📍 ABOUT GENERAL HOSPITAL</h2><p><br></p><p>General Hospital is a premier healthcare institution with over 50 years of service excellence. We are committed to providing world-class medical care while nurturing our employees\' professional growth and well-being. Join our family of healthcare professionals and make a difference in the lives of our patients every day.</p><p><br></p><p><br></p><h2>⚖️ EQUAL OPPORTUNITY EMPLOYER</h2><p><br></p><p>General Hospital is an equal opportunity employer and does not discriminate on the basis of race, color, religion, gender, sexual orientation, gender identity, national origin, age, disability, or any other protected status.</p>', 'posted', '1764505640026.jpg', 12, 0, NULL, NULL, NULL, 'medium', NULL, NULL, NULL, '2025-11-30 12:27:20', '2025-11-30 12:27:20'),
(6, 'Senior Staff Nurse - Emergency Department', 'We are looking for Senior Staff Nurse RN', 'Nursing', 'Regular / Permanent', 'Pasig', 'Minimum 3 years of experience in Emergency Department nursing', '2025-12-02', NULL, '<p><em>📍 POSITION: Senior Staff Nurse - Emergency Department</em></p><p><em>🏥 DEPARTMENT: Emergency Medicine</em></p><p><em>📌 EMPLOYMENT TYPE: Full-time Regular</em></p><p><em>📍 LOCATION: Main Hospital, Pasig</em></p><p><em>👥 VACANCIES: 3 Positions</em></p><p><em>📅 APPLICATION DEADLINE: January 30, 2024</em></p><p><br></p><p><br></p><h2>🎯 JOB SUMMARY</h2><p><br></p><p>General Hospital is seeking experienced and compassionate Senior Staff Nurses to join our expanding Emergency Department team. The ideal candidate will provide high-quality emergency care, mentor junior staff, and contribute to our mission of delivering exceptional patient-centered care in critical situations.</p><p><br></p><p><br></p><h2>📋 KEY RESPONSIBILITIES</h2><p><br></p><p>• Triage and assess patients arriving in the Emergency Department</p><p>• Provide immediate nursing care to critically ill or injured patients</p><p>• Administer medications, treatments, and emergency procedures as ordered</p><p>• Monitor patient conditions and vital signs continuously</p><p>• Collaborate with emergency physicians and healthcare team members</p><p>• Mentor and guide junior nursing staff and new graduates</p><p>• Maintain accurate and timely electronic health records</p><p>• Ensure compliance with hospital protocols and safety standards</p><p>• Participate in emergency drills and continuous training programs</p><p>• Provide emotional support and clear communication to patients and families</p><p><br></p><h2><br></h2><h2>🎓 QUALIFICATIONS &amp; REQUIREMENTS</h2><p><br></p><p><strong>Education:</strong></p><p>• Bachelor of Science in Nursing (BSN) degree</p><p>• Master\'s degree in Nursing or related field (preferred but not required)</p><p><br></p><p><strong>Licenses &amp; Certifications:</strong></p><p>• Active PRC Professional Nursing License</p><p>• Basic Life Support (BLS) certification</p><p>• Advanced Cardiac Life Support (ACLS) certification</p><p>• Pediatric Advanced Life Support (PALS) certification</p><p>• Emergency Nursing Training certification (preferred)</p><p><br></p><p><strong>Experience:</strong></p><p>• Minimum 3 years of experience in Emergency Department nursing</p><p>• At least 1 year in a senior or charge nurse role</p><p>• Experience in trauma care and critical emergency situations</p><p><br></p><p><strong>Skills &amp; Competencies:</strong></p><p>• Excellent clinical assessment and decision-making skills</p><p>• Strong leadership and team management abilities</p><p>• Effective communication and interpersonal skills</p><p>• Ability to work under pressure in fast-paced environments</p><p>• Proficiency in electronic health record systems</p><p>• Fluency in English and Filipino</p><p><br></p><p><br></p><h2>💼 WHAT WE OFFER</h2><p><br></p><p><strong>Compensation &amp; Benefits:</strong></p><p>• Competitive salary package with hazard pay</p><p>• Government-mandated benefits (SSS, PhilHealth, Pag-IBIG)</p><p>• Comprehensive HMO coverage for employee and dependents</p><p>• Retirement plan benefits</p><p>• Annual salary increase and performance bonus</p><p><br></p><p><strong>Professional Development:</strong></p><p>• Continuous training and skills enhancement programs</p><p>• Opportunities for career advancement</p><p>• Conference and seminar allowances</p><p>• Tuition fee assistance for further studies</p><p><br></p><p><strong>Work Environment:</strong></p><p>• State-of-the-art emergency facilities and equipment</p><p>• Supportive and collaborative team environment</p><p>• Regular work schedule with rotating shifts</p><p>• Modern employee facilities and amenities</p><p><br></p><p><br></p><h2>📞 HOW TO APPLY</h2><p><br></p><p>Interested and qualified applicants may submit the following documents:</p><p><br></p><p>1. Updated Resume with recent 2x2 photo</p><p>2. PRC Board Rating and License</p><p>3. Transcript of Records</p><p>4. Certificates of Employment</p><p>5. Training and Seminar Certificates</p><p>6. Other relevant credentials</p><p><br></p><p><strong>Application Methods:</strong></p><p>• Online: careers.generalhospital.ph/senior-nurse-ed</p><p>• Email: hr.recruitment@generalhospital.ph</p><p>• In-person: HR Department, 3rd Floor, Main Building</p><p><br></p><p><strong>For inquiries, please contact:</strong></p><p>Human Resources Department</p><p>📞 (02) 8123-4567 local 245</p><p>📱 0917-123-4567</p><p>🕘 Monday to Friday, 8:00 AM - 5:00 PM</p><p><br></p><p><br></p><h2>📍 ABOUT GENERAL HOSPITAL</h2><p><br></p><p>General Hospital is a premier healthcare institution with over 50 years of service excellence. We are committed to providing world-class medical care while nurturing our employees\' professional growth and well-being. Join our family of healthcare professionals and make a difference in the lives of our patients every day.</p><p><br></p><p><br></p><h2>⚖️ EQUAL OPPORTUNITY EMPLOYER</h2><p><br></p><p>General Hospital is an equal opportunity employer and does not discriminate on the basis of race, color, religion, gender, sexual orientation, gender identity, national origin, age, disability, or any other protected status.</p>', 'rejected', '1764593142289-744839527.jpg', NULL, 1, 'EMS-PILOT-2025', 'EMS HR (Pilot Tester)', 'Please Upload Now!!', 'urgent', 12, '2025-12-01 20:48:41', 'Ulitin mo', '2025-12-01 12:45:42', '2025-12-01 12:48:41'),
(7, 'Senior Staff Nurse - Emergency Department', 'We are looking for Senior Staff Nurse RN', 'Nursing', 'Contractual', 'Pasig', 'Active PRC Professional Nursing License', '2025-12-02', NULL, '<p><em>📍 POSITION: Senior Staff Nurse - Emergency Department</em></p><p><em>🏥 DEPARTMENT: Emergency Medicine</em></p><p><em>📌 EMPLOYMENT TYPE: Full-time Regular</em></p><p><em>📍 LOCATION: Main Hospital, Pasig</em></p><p><em>👥 VACANCIES: 3 Positions</em></p><p><em>📅 APPLICATION DEADLINE: January 30, 2024</em></p><p><br></p><p><br></p><h2>🎯 JOB SUMMARY</h2><p><br></p><p>General Hospital is seeking experienced and compassionate Senior Staff Nurses to join our expanding Emergency Department team. The ideal candidate will provide high-quality emergency care, mentor junior staff, and contribute to our mission of delivering exceptional patient-centered care in critical situations.</p><p><br></p><p><br></p><h2>📋 KEY RESPONSIBILITIES</h2><p><br></p><p>• Triage and assess patients arriving in the Emergency Department</p><p>• Provide immediate nursing care to critically ill or injured patients</p><p>• Administer medications, treatments, and emergency procedures as ordered</p><p>• Monitor patient conditions and vital signs continuously</p><p>• Collaborate with emergency physicians and healthcare team members</p><p>• Mentor and guide junior nursing staff and new graduates</p><p>• Maintain accurate and timely electronic health records</p><p>• Ensure compliance with hospital protocols and safety standards</p><p>• Participate in emergency drills and continuous training programs</p><p>• Provide emotional support and clear communication to patients and families</p><p><br></p><h2><br></h2><h2>🎓 QUALIFICATIONS &amp; REQUIREMENTS</h2><p><br></p><p><strong>Education:</strong></p><p>• Bachelor of Science in Nursing (BSN) degree</p><p>• Master\'s degree in Nursing or related field (preferred but not required)</p><p><br></p><p><strong>Licenses &amp; Certifications:</strong></p><p>• Active PRC Professional Nursing License</p><p>• Basic Life Support (BLS) certification</p><p>• Advanced Cardiac Life Support (ACLS) certification</p><p>• Pediatric Advanced Life Support (PALS) certification</p><p>• Emergency Nursing Training certification (preferred)</p><p><br></p><p><strong>Experience:</strong></p><p>• Minimum 3 years of experience in Emergency Department nursing</p><p>• At least 1 year in a senior or charge nurse role</p><p>• Experience in trauma care and critical emergency situations</p><p><br></p><p><strong>Skills &amp; Competencies:</strong></p><p>• Excellent clinical assessment and decision-making skills</p><p>• Strong leadership and team management abilities</p><p>• Effective communication and interpersonal skills</p><p>• Ability to work under pressure in fast-paced environments</p><p>• Proficiency in electronic health record systems</p><p>• Fluency in English and Filipino</p><p><br></p><p><br></p><h2>💼 WHAT WE OFFER</h2><p><br></p><p><strong>Compensation &amp; Benefits:</strong></p><p>• Competitive salary package with hazard pay</p><p>• Government-mandated benefits (SSS, PhilHealth, Pag-IBIG)</p><p>• Comprehensive HMO coverage for employee and dependents</p><p>• Retirement plan benefits</p><p>• Annual salary increase and performance bonus</p><p><br></p><p><strong>Professional Development:</strong></p><p>• Continuous training and skills enhancement programs</p><p>• Opportunities for career advancement</p><p>• Conference and seminar allowances</p><p>• Tuition fee assistance for further studies</p><p><br></p><p><strong>Work Environment:</strong></p><p>• State-of-the-art emergency facilities and equipment</p><p>• Supportive and collaborative team environment</p><p>• Regular work schedule with rotating shifts</p><p>• Modern employee facilities and amenities</p><p><br></p><p><br></p><h2>📞 HOW TO APPLY</h2><p><br></p><p>Interested and qualified applicants may submit the following documents:</p><p><br></p><p>1. Updated Resume with recent 2x2 photo</p><p>2. PRC Board Rating and License</p><p>3. Transcript of Records</p><p>4. Certificates of Employment</p><p>5. Training and Seminar Certificates</p><p>6. Other relevant credentials</p><p><br></p><p><strong>Application Methods:</strong></p><p>• Online: careers.generalhospital.ph/senior-nurse-ed</p><p>• Email: hr.recruitment@generalhospital.ph</p><p>• In-person: HR Department, 3rd Floor, Main Building</p><p><br></p><p><strong>For inquiries, please contact:</strong></p><p>Human Resources Department</p><p>📞 (02) 8123-4567 local 245</p><p>📱 0917-123-4567</p><p>🕘 Monday to Friday, 8:00 AM - 5:00 PM</p><p><br></p><p><br></p><h2>📍 ABOUT GENERAL HOSPITAL</h2><p><br></p><p>General Hospital is a premier healthcare institution with over 50 years of service excellence. We are committed to providing world-class medical care while nurturing our employees\' professional growth and well-being. Join our family of healthcare professionals and make a difference in the lives of our patients every day.</p><p><br></p><p><br></p><h2>⚖️ EQUAL OPPORTUNITY EMPLOYER</h2><p><br></p><p>General Hospital is an equal opportunity employer and does not discriminate on the basis of race, color, religion, gender, sexual orientation, gender identity, national origin, age, disability, or any other protected status.</p>', 'posted', '1764593394375-543430466.jpg', NULL, 1, 'EMS-PILOT-2025', 'EMS HR (Pilot Tester)', 'maybe mamaya na', 'medium', 12, '2025-12-01 20:51:50', NULL, '2025-12-01 12:49:54', '2025-12-01 12:51:50');

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
('0ae11583-cc6b-11f0-88eb-c0185091f91d', 'aNNOUNCE,MENT', 'ar4ctle', 'announcement', 'ar4ctle', '<p>ar4ctleastj</p>', 'posted', '1764342056445-790033629.png', NULL, '2025-11-28 23:00:56', '2025-11-28 23:00:56', 12),
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
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `user_id` bigint(20) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('/', '2025-11-25', 5),
('/', '2025-11-27', 8),
('/', '2025-11-28', 4),
('/', '2025-11-29', 22),
('/', '2025-11-30', 4),
('/', '2025-12-01', 19),
('/about', '2025-11-22', 4),
('/about', '2025-11-27', 3),
('/about', '2025-12-01', 2),
('/announcements', '2025-11-22', 5),
('/announcements', '2025-11-24', 26),
('/announcements', '2025-11-25', 1),
('/announcements', '2025-11-27', 5),
('/announcements', '2025-11-28', 4),
('/announcements/3ae25719-cb63-11f0-9e6e-c0185091f4ff', '2025-11-27', 1),
('/announcements/announcement', '2025-11-28', 4),
('/announcements/jame', '2025-11-24', 5),
('/announcements/jame', '2025-11-25', 1),
('/announcements/jame', '2025-11-27', 1),
('/announcements/lorem-ipsum', '2025-11-27', 2),
('/announcements/null', '2025-11-24', 1),
('/announcements/welcome-to-medisync', '2025-11-24', 6),
('/announcements/welcome-to-medisync', '2025-11-27', 1),
('/careers', '2025-11-22', 5),
('/careers', '2025-11-27', 3),
('/careers', '2025-11-30', 11),
('/careers', '2025-12-01', 9),
('/careers/3', '2025-11-27', 2),
('/careers/3', '2025-11-30', 2),
('/careers/5', '2025-11-30', 2),
('/careers/5', '2025-12-01', 25),
('/careers/7', '2025-12-01', 1),
('/contact', '2025-11-22', 3),
('/contact', '2025-11-25', 14),
('/contact', '2025-11-27', 1),
('/contact', '2025-12-01', 1),
('/dashboard', '2025-12-01', 10),
('/doctors', '2025-11-17', 7),
('/doctors', '2025-11-22', 3),
('/doctors', '2025-11-27', 3),
('/doctors', '2025-12-01', 1),
('/health', '2025-11-22', 4),
('/health', '2025-11-24', 2),
('/health', '2025-11-25', 2),
('/health', '2025-11-27', 15),
('/health', '2025-11-28', 3),
('/health/lorem-ipsum-dolor-sit-amet', '2025-11-28', 1),
('/health/null', '2025-11-24', 10),
('/health/null', '2025-11-25', 1),
('/health/wiwiwwi', '2025-11-27', 1),
('/news', '2025-11-22', 3),
('/news', '2025-11-24', 10),
('/news', '2025-11-27', 2),
('/news', '2025-11-28', 1),
('/news/aaaaa', '2025-11-24', 2),
('/news/aaaaa', '2025-11-27', 1),
('/news/announcement', '2025-11-28', 1),
('/news/jamesss', '2025-11-24', 9),
('/news/null', '2025-11-24', 6),
('/news/undefined', '2025-11-25', 2),
('/posts', '2025-11-27', 2),
('/posts', '2025-12-01', 2),
('/services', '2025-11-17', 12),
('/services', '2025-11-22', 9),
('/services', '2025-11-27', 3),
('/services', '2025-11-28', 8),
('/services', '2025-12-01', 1);

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
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` char(36) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `short_title` varchar(255) NOT NULL,
  `full_title` varchar(255) NOT NULL,
  `topic_tags` text DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('published','draft','archived') DEFAULT 'published',
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `user_id`, `short_title`, `full_title`, `topic_tags`, `description`, `status`, `image`, `created_at`, `updated_at`) VALUES
('f7c25549-c94d-11f0-a10f-c018509200f9', 12, 'kfebfhk', 'kjfkwej', 'kjnkjbfekjw', '<p>efjbwefbjwhfe</p>', 'published', '6b70b638-7e9b-409e-8a9b-c32cd0143b35.webp', '2025-11-24 23:54:57', '2025-11-24 23:54:57'),
('346aae8b-cc6b-11f0-88eb-c0185091f91d', 12, 'Mental health', 'Mental health', 'Mental health', '<p>Mental healthMental healthMental healthMental healthMental health</p>', 'published', '55d4c3f9-dd53-4d31-b7c5-8650e42d0387.png', '2025-11-28 23:02:06', '2025-11-28 23:02:06');

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
(12, 'James', 'flavierlaurence01@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:40:35', 'super_administrator', '2025-12-01 16:27:18', NULL, NULL),
(26, 'Laurence HR', 'dumpblj@gmail.com', '$2b$10$Kx3YJuI3AzNiqMq/88FSUuuowi7bRwEJGU3AnyTzoEVT8QFwZ6VrK', '2025-11-09 11:04:50', 'hr_administrator', '2025-11-09 19:23:47', NULL, NULL),
(27, 'Jerimiah Bitancor', 'bitancor1234amora@gmail.com', '$2b$10$zxqK8QflgGRswo/zYAwpauqny3wLeS478qdLvL9ofyoJQOkkpovEi', '2025-11-29 02:05:38', 'hr_administrator', '2025-12-01 06:42:29', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_hospital`
--
ALTER TABLE `about_hospital`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `doctors_visibility`
--
ALTER TABLE `doctors_visibility`
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `ems_job_logs`
--
ALTER TABLE `ems_job_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cms_reviewer_id` (`cms_reviewer_id`),
  ADD KEY `idx_job_id` (`job_id`),
  ADD KEY `idx_action` (`action`),
  ADD KEY `idx_timestamp` (`timestamp`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_urgency` (`urgency_level`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_is_read` (`is_read`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_user_read` (`user_id`,`is_read`);

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
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD KEY `fk_service_user` (`user_id`);

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
-- AUTO_INCREMENT for table `about_hospital`
--
ALTER TABLE `about_hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ems_job_logs`
--
ALTER TABLE `ems_job_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `health_tips`
--
ALTER TABLE `health_tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `post_logs`
--
ALTER TABLE `post_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ems_job_logs`
--
ALTER TABLE `ems_job_logs`
  ADD CONSTRAINT `ems_job_logs_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ems_job_logs_ibfk_2` FOREIGN KEY (`cms_reviewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `fk_service_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
