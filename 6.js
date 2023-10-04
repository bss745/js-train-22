// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.
class AuthProcessor {
  // setNextProcessor Метод, який приймає наступний обробник (processor) в ланцюгу.
  setNextProcessor(processor) {
    this.nextProcessor = processor;
    return processor;
  }
  // Зберігає наступний обробник в поточному об'єкті.
  // Повертає переданий обробник, щоб дозволити подальше ланцюжкове викликання.
  //validate Метод для перевірки аутентифікації. Приймає ім'я користувача (username) і пароль (passkey).
  validate(username, passkey) {
    if (this.nextProcessor) {
      return this.nextProcessor.validate(username, passkey);
    } else {
      return false;
    }
  }
  // Перевіряє, чи є наступний обробник в ланцюгу.
  // Якщо так, передає запит на перевірку аутентифікації наступному обробнику,this.nextProcessor.validate(username, passkey), та повертаємо результат.
  // Якщо наступного обробника немає, повертає false, сигналізуючи про невдалу аутентифікацію.
}

// TwoStepProcessor Клас обробника, який перевіряє двофакторний код. Наслідує базовий клас AuthProcessor.
class TwoStepProcessor extends AuthProcessor {
  // Метод для перевірки аутентифікації validate. Перевіряє ім'я користувача (username), пароль (passkey) і викликаємо метод isValidTwoStepCode().
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log(`Вхід дозволено з двофакторною автентифікацією`);
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }

  isValidTwoStepCode() {
    return true;
  }
  // Якщо username дорівнює "john", passkey дорівнює "password" та метод isValidTwoStepCode() повертає true, аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію: Вхід дозволено з двофакторною аутентифікацією, і повертає true.
  // Якщо дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу, super.validate(username, passkey).
  // isValidTwoStepCode Метод для перевірки двофакторного коду,який повертає true.
}

// RoleProcessor Клас обробника, який перевіряє ролі користувача. Наслідує базовий клас AuthProcessor.
class RoleProcessor extends AuthProcessor {
  // validate Метод для перевірки аутентифікації. Перевіряє роль користувача.
  validate(username) {
    if (username === "guest" && this.isValidTwoStepCode()) {
      console.log(`Вхід дозволено з роллю гостя`);
      return true;
    } else {
      return super.validate(username);
    }
  }
  // Якщо роль користувача - гість (guest), аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію Вхід дозволено з роллю гостя, і повертає true.
  // Якщо роль не відповідає, запит на аутентифікацію передається наступному обробнику в ланцюгу.
}

// CredentialsProcessor Клас обробника, який перевіряє облікові дані користувача. Наслідує базовий клас AuthProcessor.
class CredentialsProcessor extends AuthProcessor {
  //validate Метод для перевірки аутентифікації. Перевіряє облікові дані користувача.
  validate(username, passkey) {
    if (
      username === "admin" &&
      passkey === "admin123" &&
      this.isValidTwoStepCode()
    ) {
      console.log(`Вхід дозволено за обліковими даними`);
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
  // Якщо облікові дані вірні, username=admin, та passkey=admin123, аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію Вхід дозволено за обліковими даними, і повертає true.
  // Якщо облікові дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу.
}

// Клас Builder для створення об'єкта ланцюга обробників.
class ProcessorBuilder {
  // Конструктор який не приймає вхідні значення
  constructor() {
    firstProcessor = null;
    lastProcessor = null;
  }
  //Властивість firstProcessor, що зберігає перший обробник у ланцюгу, за замовчуванням дорівнює null.
  //Властивість lastProcessor, що зберігає останній обробник у ланцюгу, за замовчуванням дорівнює null.
  // Метод add для додавання нового обробника в ланцюг.

  // Якщо це перший обробник, він зберігається як перший і останній.
  // Якщо це не перший обробник, він додається в кінець ланцюга, і стає останнім.
  // Повертає this.
  // Метод create для створення ланцюга обробників.
  // Повертає перший обробник у ланцюгу.
}
console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено

console.log(`//======`);

// class AuthHandler {
//   setNextHandler(handler) {
//     this.nextHandler = handler;
//     return handler;
//   }

//   login(user, password) {
//     if (this.nextHandler) {
//       return this.nextHandler.login(user, password);
//     } else {
//       return false;
//     }
//   }
// }

// class TwoFactorAuthHandler extends AuthHandler {
//   login(user, password) {
//     if (
//       user === "John" &&
//       password === "password" &&
//       this.isValidTwoFactorCode()
//     ) {
//       console.log(`Вхід дозволено з двофакторною автентифікацією`);
//       return true;
//     } else {
//       return super.login(user, password);
//     }
//   }

//   isValidTwoFactorCode() {
//     return true;
//   }
// }

// const handler = new TwoFactorAuthHandler();

// handler.setNextHandler({
//   login: (login, password) => {
//     const result =
//       login === "login" && password === "password"
//         ? "Користувач увійшов в акаунт"
//         : "Користувач не увійшов в акаунт";
//     console.log(result);
//     return result;
//   },
// });

// handler.login("login", "password");
