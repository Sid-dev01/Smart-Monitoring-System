// 
import { motion } from 'framer-motion';
import { Code, Brain, Server, Mail, Linkedin, Github } from 'lucide-react';

const TeamMember = ({ name, role, category, github_link, linkedin_link, mail_link, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 rounded-full text-sm font-medium">
          {category}
        </span>
      </div>

      <div className="flex space-x-3">
        {/* LinkedIn */}
        <a
          href={linkedin_link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/20 transition-colors"
        >
          <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>

        {/* GitHub */}
        <a
          href={github_link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/20 transition-colors"
        >
          <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>

        {/* Mail */}
        <a
          href={mail_link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/20 transition-colors"
        >
          <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </a>
      </div>
    </motion.div>
  );
};

const About = () => {
  const team = {
    frontend: [
      {
        name: 'Riddhi Rastogi',
        role: 'React + UI/UX Engineer',
        github_link: 'https://github.com/Riddhi-Rastogi',
        linkedin_link:
          'https://www.linkedin.com/in/riddhi-rastogi-38b11032b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail_link: 'mailto:rids010171@gmail.com',
      },
      {
        name: 'Priyanshi Raj',
        role: 'React + UI/UX Engineer',
        github_link: 'https://github.com/Priyanshi310504',
        linkedin_link:
          'https://www.linkedin.com/in/priyanshi-raj-513b20314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail_link: 'mailto:pgbypr@gmail.com',
      },
    ],
    ml: [
      {
        name: 'Siddhartha Gautam',
        role: 'Computer Vision Expert',
        github_link: 'https://github.com/Sid-dev01',
        linkedin_link:
          'https://www.linkedin.com/in/siddhartha-gautam-259525287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail_link: 'mailto:sid.2005.19@gmail.com',
      },
      {
        name: 'Nitin Jaiswal',
        role: 'Pose Estimation Specialist',
        github_link: 'https://github.com/nitinjswgithub066',
        linkedin_link: 'https://www.linkedin.com/in/nitin-jaiswal-',
        mail_link: 'mailto:nitinjsw066@gmail.com',
      },
    ],
    backend: [
      {
        name: 'Khushi Mishra',
        role: 'API & Infrastructure Engineer',
        github_link: 'https://github.com/Khushi-Mishra-dev',
        linkedin_link:
          'https://www.linkedin.com/in/khushi-mishra-380b722b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail_link: 'mailto:mishrakhushi8081@gamil.com',
      },
      {
        name: 'Ruchi Singh',
        role: 'Backend Developer',
        github_link: 'https://github.com/Ruchi-Singh25',
        linkedin_link:
          'https://www.linkedin.com/in/ruchi-singh-92983131a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        mail_link: 'mailto:ruchiisinghh1225@gmail.com',
      },
    ],
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              Shiksha Suraksha
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize skill development through
            cutting-edge AI technology
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-accent-600 to-primary-600 rounded-3xl p-12 mb-20 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-xl text-center max-w-3xl mx-auto leading-relaxed opacity-95">
            To improve training quality through AI-driven classroom monitoring,
            empowering educators with real-time insights and data-driven
            recommendations that enhance the learning experience and ensure every
            student reaches their full potential.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analysis',
                description:
                  'Advanced computer vision and machine learning algorithms analyze classroom dynamics in real-time.',
              },
              {
                title: 'Actionable Insights',
                description:
                  'Transform raw data into meaningful insights that help trainers improve their teaching methods.',
              },
              {
                title: 'Quality Assurance',
                description:
                  'Ensure consistent training quality across all sessions with automated monitoring and reporting.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>

          {/* Frontend Team */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-accent-600" />
              Frontend Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Creating seamless, responsive interfaces that bring AI insights to life
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.frontend.map((member, index) => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  category="Frontend"
                  github_link={member.github_link}
                  linkedin_link={member.linkedin_link}
                  mail_link={member.mail_link}
                  icon={Code}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* ML Team */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-accent-600" />
              Machine Learning & AI
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Experts in Computer Vision and Pose Estimation powering real-time analysis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.ml.map((member, index) => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  category="Machine Learning"
                  github_link={member.github_link}
                  linkedin_link={member.linkedin_link}
                  mail_link={member.mail_link}
                  icon={Brain}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Backend Team */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Server className="w-6 h-6 mr-3 text-accent-600" />
              Backend Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Building robust APIs and data infrastructure for scalable solutions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.backend.map((member, index) => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  category="Backend"
                  github_link={member.github_link}
                  linkedin_link={member.linkedin_link}
                  mail_link={member.mail_link}
                  icon={Server}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Interested in transforming your training programs with AI? Get in touch with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:shi31raj@gmail.com"
              className="btn-primary flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>shi31raj@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
