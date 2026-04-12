using SyriaShomoos.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace SyriaShomoos.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class SyriaShomoosController : AbpControllerBase
{
    protected SyriaShomoosController()
    {
        LocalizationResource = typeof(SyriaShomoosResource);
    }
}
