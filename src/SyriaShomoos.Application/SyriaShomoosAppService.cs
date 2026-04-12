using SyriaShomoos.Localization;
using Volo.Abp.Application.Services;

namespace SyriaShomoos;

/* Inherit your application services from this class.
 */
public abstract class SyriaShomoosAppService : ApplicationService
{
    protected SyriaShomoosAppService()
    {
        LocalizationResource = typeof(SyriaShomoosResource);
    }
}
