using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp.Account.Web.Pages.Account;

public class LoginModel : AccountPageModel
{
  [BindProperty]
  public LoginInputModel LoginInput { get; set; }

  [BindProperty(SupportsGet = true)]
  public string ReturnUrl { get; set; }

  public async Task<IActionResult> OnPostAsync(string action)
  {
    ValidateModel();

    var result = await SignInManager.PasswordSignInAsync(
        LoginInput.UserNameOrEmailAddress,
        LoginInput.Password,
        LoginInput.RememberMe,
        true
    );

    if (result.Succeeded)
    {
      return await RedirectSafelyAsync(ReturnUrl);
    }

    ModelState.AddModelError("", "Invalid login attempt");
    return Page();
  }

  public class LoginInputModel
  {
    public string UserNameOrEmailAddress { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
  }
}