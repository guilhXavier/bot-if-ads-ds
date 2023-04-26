const emailValidator = (email: string): boolean => {
  const ACADEMIC_EMAIL_DOMAIN = '@academico.ifsul.edu.br';

  return email
    .toLocaleLowerCase()
    .replace(/\s/g, '')
    .includes(ACADEMIC_EMAIL_DOMAIN);
};

export { emailValidator };
