import yup from 'yup';

const schemaEmail = yup.object().shape({
  email: yup.string().email().required(),
});

const emailValidator = async (email: string): Promise<boolean> => {
  const IF_EMAIL_DOMAIN = '@academico.ifsul.edu.br';

  return schemaEmail
    .validate({ email })
    .then((value) => value.email.includes(IF_EMAIL_DOMAIN))
    .catch(() => false);
};

export { emailValidator };
