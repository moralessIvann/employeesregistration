using Microsoft.IdentityModel.Tokens;
using net_angular.Models;
using net_angular.Models.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace net_angular.Servicios
{
    public class UsuarioAPIServicio : IUsuarioAPI
    {
        private readonly IConfiguration configuration;

        public UsuarioAPIServicio(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public UsuarioAPIViewModel Autenticacion(AuthenticationAPI authenticationAPI) //si llega
        {
            UsuarioAPIViewModel res = new UsuarioAPIViewModel();
            byte[] keyBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };
            Util util = new Util(keyBytes);

            using (CursoAngularNetCoreContext basedatos = new CursoAngularNetCoreContext())
            {
                UsuariosApi usuarioAPI = basedatos.UsuariosApis.Single(usuario => usuario.Email == authenticationAPI.email);
                if (usuarioAPI != null &
                    authenticationAPI.password == util.DecryptText(Encoding.ASCII.GetString(usuarioAPI.Password), configuration["ClaveSecreta"]))
                { 
                    res.email = usuarioAPI.Email;
                    res.token = GenerarTokenJWT(authenticationAPI);
                }
                else 
                {
                    throw new Exception("Unknown User");
                }
            }

            return res;
        }

        //Generar token
        private string GenerarTokenJWT(AuthenticationAPI usuarioInfo)
        {
            var _symmetricSecurityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration["JWT:ClaveSecretaJWT"]));

            var _signingCredentials = new SigningCredentials(
                _symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            // header
            var _header = new JwtHeader(_signingCredentials);

            // claims
            var _claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, usuarioInfo.email),
            };

            // payload
            var _payload = new JwtPayload(
                issuer: configuration["JWT:Issuer"],
                audience: configuration["JWT:Audience"],
                claims: _claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(5)
                );

            // token
            var _token = new JwtSecurityToken(_header, _payload);

            string token = new JwtSecurityTokenHandler().WriteToken(_token);
            
            return token;
        }
    }
}
