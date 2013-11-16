using Microsoft.Practices.ServiceLocation;
using Microsoft.Practices.Unity;

namespace MyMovies.UI
{
    public static class Bootstrapper
    {
        public static void Initialize()
        {
            var locator = new UnityServiceLocator(_ConfigureUnityContainer());

            ServiceLocator.SetLocatorProvider(() => locator);
        }

        public static IUnityContainer RegisterTypes(IUnityContainer container)
        {
            //container.RegisterType<IAccountManagementService, AccountManagementService>();
            return container;
        }

        private static IUnityContainer _ConfigureUnityContainer()
        {
            var container = new UnityContainer();

            RegisterTypes(container);

            return container;
        }
    }
}