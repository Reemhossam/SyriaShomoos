using SyriaShomoos.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace SyriaShomoos.Permissions;

public class SyriaShomoosPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(SyriaShomoosPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(SyriaShomoosPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<SyriaShomoosResource>(name);
    }
}
