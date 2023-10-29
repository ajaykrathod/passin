
  const iterations: number = 10000;

  export const hashPassword = (password: string): string => {
    const salt = generateSalt();
    let hashedPassword = hashWithSalt(password, salt);

    for (let i = 1; i < iterations; i++) {
      hashedPassword = hashWithSalt(hashedPassword, salt);
    }

    return `${salt}$${iterations}$${hashedPassword}`;
  }

  export const verifyPassword = (inputPassword: string, storedPassword: string): boolean => {
    const [storedSalt, storedIterations, storedHash] = storedPassword.split('$');
    const iterations = parseInt(storedIterations, 10);

    let hashedPassword = hashWithSalt(inputPassword, storedSalt);

    for (let i = 1; i < iterations; i++) {
      hashedPassword = hashWithSalt(hashedPassword, storedSalt);
    }

    return hashedPassword === storedHash;
  }

  export const generateSalt = (): string => {
    const saltLength = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';

    for (let i = 0; i < saltLength; i++) {
      salt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return salt;
  }

  export const hashWithSalt = (password: string, salt: string): string => {
    let hash = 0;

    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }

    return `${salt}${hash}`;
  }


// Example usage
// const password = 'your_secure_password';
// const hashedPassword = hashPassword(password);

// console.log(`Password: ${password}`);
// console.log(`Hashed Password: ${hashedPassword}`);

// const isPasswordValid = verifyPassword(password, hashedPassword);
// console.log(`Password is valid: ${isPasswordValid}`);
