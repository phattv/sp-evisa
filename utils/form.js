const scrollToFirstErrorMessage = () => {
  setTimeout(() => {
    const errorMessages = document.getElementsByClassName('ui error');
    if (errorMessages && errorMessages.length > 0) {
      window.scrollTo({
        top:
          errorMessages[0].getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth',
      });
    }
  }, 300);
};

export { scrollToFirstErrorMessage };
