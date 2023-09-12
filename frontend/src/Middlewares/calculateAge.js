function calculateAge(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
  
    const currentYear = currentDate.getFullYear();
    const birthYear = birthDate.getFullYear();
  
    const age = currentYear - birthYear;
  
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
  
    // Check if the birthday month is after the current month or if it's the same month but the day hasn't occurred yet
    if (
      birthMonth > currentMonth ||
      (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())
    ) {
      // If the birthday hasn't occurred this year yet, subtract one year
      return age - 1;
    }
  
    return age;
  }
  
  export default calculateAge;
  