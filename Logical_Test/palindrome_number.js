const isPalindrome = (x) => {
  const reverse = String(x).split("").reverse().join("");
  if (String(x) === String(reverse)) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
};

isPalindrome(121);
isPalindrome(-121);
isPalindrome(10);
