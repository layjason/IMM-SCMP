const getRole = (id) => {
  if (!id) return 'STUDENT'; // Fallback
  const firstLetter = id.charAt(0);
  switch (firstLetter) {
    case 'T':
      return 'TEACHER';
    case 'A':
      return 'ASSISTANT';
    case 'S':
      return 'STUDENT';
    default:
      return 'STUDENT';
  }
};

export default getRole;
