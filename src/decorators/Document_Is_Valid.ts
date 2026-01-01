import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { cpf, cnpj } from "cpf-cnpj-validator";

export function DocumentIsValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "DocumentIsValid",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;

          const document = String(value).replace(/\D/g, "");

          if (document.length === 11) {
            return cpf.isValid(document);
          }

          if (document.length === 14) {
            return cnpj.isValid(document);
          }

          return false;
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CPF ou CNPJ válido`;
        },
      },
    });
  };
}
