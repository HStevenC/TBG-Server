

module.exports = function(req, res, next) {
    const { user_email, user_name, user_password } = req.body;
    
    function validEmail(useremail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
    }
  
    if (req.path === "/register") {
      console.log(user_email);
      if (![user_email, user_name, user_password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(user_email)) {
        return res.status(401).json("Invalid Email");
      }
    } 
    
    else if (req.path === "/login") {
      if (![user_email, user_password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(user_email)) {
        return res.status(401).json("Invalid Email");
      }
    }
    next();
  };