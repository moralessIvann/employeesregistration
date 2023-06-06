using net_angular.Models.ViewModels;

namespace net_angular.Servicios
{
    public interface IUsuarioAPI
    {
        public UsuarioAPIViewModel Autenticacion(AuthenticationAPI authenticationAPI);
    }
}
