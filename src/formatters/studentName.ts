const studentNameFormatter = (name: string): string => {
  const splitName = name.split(' ');

  const middleNames = splitName
    .slice(1, -1)
    .map((middleName: string): string => middleName.charAt(0).toUpperCase())
    .join('. ');

  const abbreviatedMiddleNames = `${middleNames}.`;

  return `${splitName.at(0)} ${abbreviatedMiddleNames} ${splitName.at(-1)}`;
};

export { studentNameFormatter };
