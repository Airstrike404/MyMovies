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
            WebSecurity.InitializeDatabaseConnection("Membership", "UserProfiles", "UserId", "UserName", autoCreateTables: true);
        }
    }
}