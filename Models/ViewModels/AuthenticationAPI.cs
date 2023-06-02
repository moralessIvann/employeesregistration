using System.ComponentModel.DataAnnotations;

namespace net_angular.Models.ViewModels;

public class AuthenticationAPI
{
    [Required]
    public string email { get; set; }

    [Required]
    public string password { get; set; }
}
