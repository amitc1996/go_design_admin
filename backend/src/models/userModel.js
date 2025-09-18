import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  id: { 
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: { 
    type: DataTypes.STRING(255),   
    allowNull: false,
  },
  email: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: { 
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true,
  },
  company_name: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  reset_token: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  reset_token_expire: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  remember_token: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  is_active: { 
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 1,
  },
  wallet_balance: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
  email_verified_at: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  new_email: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  new_email_token: { 
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  last_login: { 
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: { 
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: "user",
  },
  created_by: { 
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  updated_by: { 
    type: DataTypes.BIGINT,
    allowNull: true,
  }
}, {
  timestamps: true,      
  paranoid: true,       
  underscored: true,     
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});


User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.prototype.addToWallet = async function (amount) {
  this.wallet_balance = parseFloat(this.wallet_balance || 0) + parseFloat(amount);
  await this.save();
  return this.wallet_balance;
};

User.prototype.deductFromWallet = async function (amount) {
  if (parseFloat(this.wallet_balance || 0) < parseFloat(amount)) {
    throw new Error("Insufficient wallet balance");
  }
  this.wallet_balance = parseFloat(this.wallet_balance) - parseFloat(amount);
  await this.save();
  return this.wallet_balance;
};

export default User;
