import React from 'react';
import { User, Mail} from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Om Shinde',
      PRN: '202402040015',
      role: 'Team Member',
      email: 'omshinde7219@gmail.com',
    },
    {
      name: 'Pawan Shinde',
      PRN: '202402040012',
      role: 'Team Member',
      email: 'shindepawan333@gmail.com',
    },
    {
      name: 'Hari Sharma',
      PRN: '202402040013',
      role: 'Team Member',
      email: 'harisharmams9890@gmail.com',
    },
  ];

  return (
    <section
      id="team"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Team</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Meet the team behind this project
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {member.name}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-1">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PRN: {member.PRN}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

