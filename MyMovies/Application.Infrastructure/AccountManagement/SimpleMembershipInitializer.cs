using System;
using System.Data.Entity;
using System.Threading;
using System.Web.Security;
using WebMatrix.WebData;

namespace Application.Infrastructure.AccountManagement
{
    public class SimpleMembershipInitializer
    {
        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        public static void Initialize()
        {
            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
        }

        public SimpleMembershipInitializer()
        {
            //Database.SetInitializer<LmPlatformModelsContext>(null);

            try
            {
                bool firstLoad;

                //using (var context = new LmPlatformModelsContext())
                //{
                //    firstLoad = DataBaseInitializer.InitializeDatabase(context);
                //}

                WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "UserId", "UserName", autoCreateTables: true);

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Ошибка", ex);
            }
        }
    }
}