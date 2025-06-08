const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

// Payment Model
const Payment = sequelize.define('Payment', {
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acc_holder_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  card_no: {
    type: DataTypes.STRING
  },
  card_no_cw: {
    type: DataTypes.STRING
  },
  bank_city: {
    type: DataTypes.STRING
  },
  bank_bic_swift: {
    type: DataTypes.STRING
  }
});

// Company Model
const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING
  },
  categories: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

// Job Model
const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING
  },
  max_salary: {
    type: DataTypes.FLOAT
  },
  min_salary: {
    type: DataTypes.FLOAT
  },
  application_deadline: {
    type: DataTypes.DATE
  },
  type: {
    type: DataTypes.ENUM('Full time', 'Part time'),
    allowNull: false
  },
  salary_period: {
    type: DataTypes.ENUM('Monthly', 'Weekly', 'Daily')
  },
  questions: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('On Hold', 'Interview', 'Rejected')
  }
});

// Applicant Model
const Applicant = sequelize.define('Applicant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  disability_type: {
    type: DataTypes.STRING
  },
  major: {
    type: DataTypes.STRING
  },
  language: {
    type: DataTypes.STRING
  },
  education: {
    type: DataTypes.STRING
  },
  my_experience: {
    type: DataTypes.TEXT
  }
});

// Application Model (for Apply relationship)
const Application = sequelize.define('Application', {
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
    defaultValue: 'Pending'
  },
  rating: {
    type: DataTypes.INTEGER
  },
  feedback: {
    type: DataTypes.TEXT
  },
  understood: {
    type: DataTypes.BOOLEAN
  },
  would_recommend: {
    type: DataTypes.BOOLEAN
  }
});

// Article Model
const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Video Model
const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

// Define Relationships

// Company has many Jobs
Company.hasMany(Job);
Job.belongsTo(Company);

// Applicant applies to many Jobs (through Application)
Applicant.belongsToMany(Job, { through: Application });
Job.belongsToMany(Applicant, { through: Application });

// Payment belongs to Applicant
Payment.belongsTo(Applicant);
Applicant.hasOne(Payment);

// Article and Video relationships (assuming they belong to Company)
Article.belongsTo(Company);
Company.hasMany(Article);

// Sync all models with database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });

module.exports = {
  Payment,
  Company,
  Job,
  Applicant,
  Application,
  Article,
  Video,
  sequelize
};