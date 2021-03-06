﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Security;
using WebMatrix.WebData;

namespace Application.Infrastructure.AccountManagement
{
	public class AccountManagementService : IAccountManagementService
	{
		public bool Login(string login, string password, bool remembeMe)
		{
			bool result;

			try
			{
				result = WebSecurity.Login(login, password, remembeMe);
			}
			catch (ArgumentException)
			{
				result = false;
			}

			return result;
		}
		
		public void Logout()
		{
			WebSecurity.Logout();
		}

		public string CreateAccount(string login, string password, IList<string> roles, object properties = null, bool requireConfirmationToken = false)
		{
			var confirmationToken = WebSecurity.CreateUserAndAccount(login, password, properties, requireConfirmationToken);

			if (roles.Any())
			{
				Roles.AddUserToRoles(login, roles.ToArray());
			}

			return confirmationToken;
		}

		public bool ChangePassword(string userName, string oldPassword, string newPassword)
		{
			return WebSecurity.ChangePassword(userName, oldPassword, newPassword);
		}
	}
}